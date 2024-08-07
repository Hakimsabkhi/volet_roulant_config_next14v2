import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import DevisVoletRenovation from '../../../models/DevisVoletRenovation';
import User from '../../../models/User';  // Import the User model
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the user from the database
    const user = await User.findOne({ email: token.email }).exec();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const newDevis = new DevisVoletRenovation({
      ...body,
      user: user._id,  // Use the MongoDB ObjectId
    });

    const result = await newDevis.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error saving data', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: 'GET method is not supported for this endpoint' }, { status: 405 });
}
