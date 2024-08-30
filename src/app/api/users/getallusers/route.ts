import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract and verify the token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the user associated with the token
    const authenticatedUser = await User.findOne({ email: token.email }).exec();
    if (!authenticatedUser || !['SuperAdmin', 'Admin'].includes(authenticatedUser.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all users except the authenticated user
    const users = await User.find({ email: { $ne: authenticatedUser.email } }).exec();

    // Return the fetched users, excluding the authenticated user
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);

    // Return error details only in development, generic message in production
    return NextResponse.json({
      error: 'Error fetching data',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    }, { status: 500 });
  }
}
