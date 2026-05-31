import { NextResponse } from 'next/server';
import { connectDB, isDbConfigured } from '@/lib/db/mongoose';

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { status: 'unavailable', database: 'MongoDB', error: 'MONGO_URI is not configured' },
      { status: 503 }
    );
  }

  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json(
        { status: 'unavailable', database: 'MongoDB', error: 'Could not connect to MongoDB' },
        { status: 503 }
      );
    }
    await conn.connection.db?.admin().command({ ping: 1 });
    return NextResponse.json({ status: 'ok', database: 'MongoDB', version: '1.0' });
  } catch (error) {
    return NextResponse.json(
      { status: 'unavailable', error: error instanceof Error ? error.message : 'Unknown' },
      { status: 503 }
    );
  }
}
