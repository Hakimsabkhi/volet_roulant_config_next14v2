import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import AdresseLivraison from '@/models/AdresseLivraison';
import { getToken } from 'next-auth/jwt';
import User from '@/models/User';

async function getUserFromToken(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  const user = await User.findOne({ email: token.email }).exec();
  if (!user) {
    return { error: 'User not found', status: 404 };
  }

  return { user };
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const result = await getUserFromToken(req);
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    const { user } = result;

    const body = await req.json();

    const newAddress = new AdresseLivraison({
      ...body,
      client: user._id,
    });

    const saveResult = await newAddress.save();

    return NextResponse.json(saveResult, { status: 201 });
  } catch (error) {
    console.error('Error saving address:', error);
    return NextResponse.json(
      { error: 'Error saving address', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();

    const result = await getUserFromToken(req);
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    const { user } = result;

    const body = await req.json();

    const address = await AdresseLivraison.findOneAndUpdate(
      { _id: body._id, client: user._id }, // Ensure the user owns the address
      body,
      { new: true }
    );

    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { error: 'Error updating address', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// New GET method to retrieve addresses
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
