import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';

export async function requireDatabaseConnection(): Promise<NextResponse | null> {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database unavailable. Set MONGO_URI and ensure MongoDB is running.',
          data: [],
        },
        { status: 503 }
      );
    }
    return null;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Database unavailable. Ensure MongoDB is running and MONGO_URI is correct.';
    return NextResponse.json({ success: false, error: message, data: [] }, { status: 503 });
  }
}
