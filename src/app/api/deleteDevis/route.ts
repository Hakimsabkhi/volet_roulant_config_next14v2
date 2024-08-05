import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import DevisVoletRenovation from '../../../models/DevisVoletRenovation';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const { id } = await req.json();
    const result = await DevisVoletRenovation.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: 'Devis not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Devis deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting data' }, { status: 500 });
  }
}
