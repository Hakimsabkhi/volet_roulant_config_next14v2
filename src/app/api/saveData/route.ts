// src/app/api/saveData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import DevisVoletRenovation from '../../../models/DevisVoletRenovation';
import User from '../../../models/User';
import { getToken } from 'next-auth/jwt';

interface MongoServerError extends Error {
  code: number;
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: token.email }).exec();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();

    // Find the last Devis created by the user
    const lastDevis = await DevisVoletRenovation.findOne({ user: user._id })
      .sort({ DevisNumber: -1 })
      .exec();
    const lastDevisNumber = lastDevis ? parseInt(lastDevis.DevisNumber, 10) : 0;
    const newDevisNumber = (lastDevisNumber + 1).toString().padStart(6, '0');

    const newDevis = new DevisVoletRenovation({
      ...body,
      user: user._id,
      DevisNumber: newDevisNumber,
    });

    const result = await newDevis.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if ((error as MongoServerError).code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate DevisNumber detected. Please try again.' },
        { status: 400 }
      );
    }
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
