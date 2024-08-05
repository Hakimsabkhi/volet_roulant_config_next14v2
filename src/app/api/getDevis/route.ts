import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import DevisVoletRenovation from '../../../models/DevisVoletRenovation';

export async function GET() {
  try {
    await connectToDatabase();

    const devis = await DevisVoletRenovation.find().exec();

    return NextResponse.json(devis, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
