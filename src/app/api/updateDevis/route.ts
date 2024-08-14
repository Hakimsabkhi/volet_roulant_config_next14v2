import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import DevisVoletRenovation from '../../../models/DevisVoletRenovation';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body to get the data
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: 'Devis ID is required' }, { status: 400 });
    }

    // Find the devis by ID and update it
    const result = await DevisVoletRenovation.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    if (!result) {
      return NextResponse.json({ error: 'Devis not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Devis updated successfully', devis: result }, { status: 200 });
  } catch (error) {
    console.error('Error updating devis:', error);
    return NextResponse.json({ error: 'Error updating data' }, { status: 500 });
  }
}
