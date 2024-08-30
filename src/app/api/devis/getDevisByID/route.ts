// src/app/api/devis/getDevisByID/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import DevisVoletRenovation from '@/models/DevisVoletRenovation'; // Adjust the import path as needed
import { Types } from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const id = req.nextUrl.searchParams.get('id');
    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    const devis = await DevisVoletRenovation.findById(id).exec();
    if (!devis) {
      return NextResponse.json({ error: 'Devis not found' }, { status: 404 });
    }

    return NextResponse.json(devis, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching data', details: (error as Error).message }, { status: 500 });
  }
}