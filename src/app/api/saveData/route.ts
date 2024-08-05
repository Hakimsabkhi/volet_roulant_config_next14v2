import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import DevisVoletRenovation from '../../../models/DevisVoletRenovation';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const newDevis = new DevisVoletRenovation(body);
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
  return NextResponse.json({ message: "GET method is not supported for this endpoint" }, { status: 405 });
}
