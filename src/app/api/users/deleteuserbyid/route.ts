// src/app/api/users/deleteuserbyid/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const {id} = await req.json();
    console.log("Received ID for deletion:", id);

    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await User.findByIdAndDelete(id);
    console.log("Deletion result:", result);

    if (!result) {
      console.log("User not found for ID:", id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting data' }, { status: 500 });
  }
}
