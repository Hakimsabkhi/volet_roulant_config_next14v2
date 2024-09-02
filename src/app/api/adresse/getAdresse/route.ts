/* src/api/adresse/getAdresse/route.ts */
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import AdresseLivraison from '@/models/AdresseLivraison';
import { getToken } from 'next-auth/jwt';
import User from '@/models/User';

async function getUserFromToken(req: NextRequest) {
  console.log('Request Headers:', req.headers); // Log request headers
  console.log('Cookies:', req.cookies); // Log cookies if available

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Retrieved Token:', token); // Log the token to verify its existence
  
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  const user = await User.findOne({ email: token.email }).exec();
  if (!user) {
    return { error: 'User not found', status: 404 };
  }

  return { user };
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const result = await getUserFromToken(req);
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    const { user } = result;

    // Retrieve all addresses associated with the logged-in user
    const addresses = await AdresseLivraison.find({ client: user._id }).exec();

    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    console.error('Error retrieving addresses:', error);
    return NextResponse.json(
      { error: 'Error retrieving addresses', details: (error as Error).message },
      { status: 500 }
    );
  }
}