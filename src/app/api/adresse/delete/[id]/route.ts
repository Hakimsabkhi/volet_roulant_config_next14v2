// src/app/api/adresse/delete/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import AdresseLivraison from '@/models/AdresseLivraison';
import { getToken } from 'next-auth/jwt';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = req.url?.split('/').pop() as string;
    console.log('Attempting to delete address with ID:', id);

    const deletedAddress = await AdresseLivraison.findByIdAndDelete(id);

    if (!deletedAddress) {
      console.log('Address not found:', id);
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    console.log('Deleted address:', deletedAddress);
    return NextResponse.json({ message: 'Address deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json(
      { error: 'Error deleting address', details: (error as Error).message },
      { status: 500 }
    );
  }
}
