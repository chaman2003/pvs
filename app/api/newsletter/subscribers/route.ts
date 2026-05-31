import { NextRequest, NextResponse } from 'next/server';
import { Newsletter } from '@/lib/models/Newsletter';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const dbError = await requireDatabaseConnection();
  if (dbError) return dbError;

  try {
    const subscribers = await Newsletter.find().sort({ date: -1 }).lean();
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
