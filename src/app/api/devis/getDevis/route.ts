import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import DevisVoletRenovation from '@/models/DevisVoletRenovation';
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

    // Retrieve all DevisVoletRenovation documents associated with the logged-in user
    const devis = await DevisVoletRenovation.find({ user: user._id }).exec();

    return NextResponse.json(devis, { status: 200 });
  } catch (error) {
    console.error('Error retrieving devis:', error);
    return NextResponse.json(
      { error: 'Error retrieving devis', details: (error as Error).message },
      { status: 500 }
    );
  }
}
