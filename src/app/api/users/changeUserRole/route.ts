import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body to get the data
    const { userId, newRole } = await req.json();

    if (!userId || !newRole) {
      return NextResponse.json({ error: 'User ID and new role are required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid User ID format' }, { status: 400 });
    }

    // Log the userId and attempt to find the user
    console.log('Searching for user with ID:', userId);

    // Convert userId to ObjectId and find the user by ID
    const objectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(objectId).exec();

    // Log the result of the query
    console.log('Query result:', user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate the new role
    if (!['Admin', 'Consulter', 'Visiteur'].includes(newRole)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Update the user's role
    user.role = newRole;
    await user.save();

    return NextResponse.json({ message: 'User role updated successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
}
