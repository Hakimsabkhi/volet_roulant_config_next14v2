/* lib/authOptions.ts */

import { NextAuthOptions, Session, User, DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import connectToDatabase from '@/lib/db';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import UserModel from '@/models/User';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role?: string | null;
  }
}

type UserType = {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  role?: string;
  save: () => Promise<UserType>;
};

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const googleClientId: string = getEnvVar('GOOGLE_CLIENT_ID');
const googleClientSecret: string = getEnvVar('GOOGLE_CLIENT_SECRET');
const nextAuthSecret: string = getEnvVar('NEXTAUTH_SECRET');

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          console.error('Missing credentials');
          return null;
        }

        try {
          await connectToDatabase();

          const user = await UserModel.findOne({ email: credentials.email }).exec() as UserType | null;
          if (!user) {
            console.error('No user found with this email:', credentials.email);
            return null;
          }

          const isPasswordValid = bcrypt.compareSync(credentials.password, user.password || '');
          if (!isPasswordValid) {
            console.error('Invalid password for user:', credentials.email);
            return null;
          }

          return { id: user._id.toString(), name: user.username, email: user.email, role: user.role };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      } else {
        if (token?.id && typeof token.id === 'string') {
          await connectToDatabase();
          try {
            const objectId = new mongoose.Types.ObjectId(token.id);
            const dbUser = await UserModel.findById(objectId).lean().exec();
            if (dbUser) {
              token.role = dbUser.role;
            } else {
              console.error('User not found for ID:', token.id);
            }
          } catch (error) {
            console.error('Error fetching user with ID:', error);
          }
        }
      }
      return token;
    },
    
    async session({ session, token }: { session: Session, token: JWT }) {
      console.log('Session Callback - Token Role:', token.role);
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    
    async signIn({ user }: { user: User }) {
      try {
        await connectToDatabase();
    
        let existingUser = await UserModel.findOne({ email: user.email }).exec() as UserType | null;
    
        if (!existingUser) {
          // If the user is signing in for the first time, generate a new ObjectId
          const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(), // Create a new ObjectId instance
            username: user.name!,
            email: user.email as string,
            role: 'Visiteur', // Set role to 'Visiteur' for first-time users
          });
    
          const savedUser = await newUser.save();
          user.id = (savedUser._id as mongoose.Types.ObjectId).toString(); // Explicitly cast _id to ObjectId and then to string
          user.role = savedUser.role; // Assign the new user's role
        } else {
          user.id = existingUser._id.toString(); // Use the existing user's ObjectId
          user.role = existingUser.role; // Assign the existing user's role
        }
    
        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },
    

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: nextAuthSecret,
  debug: true,
};
