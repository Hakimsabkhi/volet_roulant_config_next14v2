import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    console.log('Received request at /api/auth/signup');
    
    // Parse JSON body from the request
    const data = await req.json();
    console.log('Received data:', data);

    const { email, password, username } = data;

    // Validate required fields
    if (!email || !password || !username) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();
    console.log('Connected to database');

    // Check if the user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      console.log('User with this email already exists');
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Password hashed');

    // Create a new user instance
    const newUser = new User({
      _id: new mongoose.Types.ObjectId().toString(), // Ensure _id is a string
      username,
      email,
      password: hashedPassword,
      role: 'Visiteur', // Default role as defined in the model
    });

    // Save the new user to the database
    await newUser.save();
    console.log('User created successfully');

    // Respond with success
    return NextResponse.json(
      { message: 'User created successfully', user: { email, username, role: 'Visiteur' } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
