/* src/app/api/devis/getDevis */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import DevisVoletRenovation from '@/models/DevisVoletRenovation';
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
    const user = await User.findOne({ email: token.email }).exec();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch DevisVoletRenovation documents for the user
    const devis = await DevisVoletRenovation.find({ user: user._id }).exec();

    // Return the fetched data
    return NextResponse.json(devis, { status: 200 });
  } catch (error) {
    console.error(error);

    // Return error details only in development, generic message in production
    return NextResponse.json({
      error: 'Error fetching data',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    }, { status: 500 });
  }
}

// This explicitly marks the route as dynamic
export const dynamic = 'force-dynamic';
