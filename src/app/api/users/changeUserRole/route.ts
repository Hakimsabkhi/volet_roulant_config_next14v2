import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';

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

    // Extract and verify the token to identify the authenticated user
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find the authenticated user
    const authenticatedUser = await User.findOne({ email: token.email }).exec();
    if (!authenticatedUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Log the userId and attempt to find the user to be updated
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

    // Only SuperAdmins can assign the Admin role
    if (newRole === 'Admin' && authenticatedUser.role !== 'SuperAdmin') {
      return NextResponse.json({ error: 'Forbidden: Only SuperAdmins can assign the Admin role' }, { status: 403 });
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
