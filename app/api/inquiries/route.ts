import { NextRequest, NextResponse } from 'next/server';
import { Inquiry } from '@/lib/models/Inquiry';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { listInquiriesFromFile } from '@/lib/inquiries/file-store';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const fileInquiries = await listInquiriesFromFile();
    const dbError = await requireDatabaseConnection();
    if (dbError) {
      return NextResponse.json({ success: true, data: fileInquiries });
    }

    const dbInquiries = await Inquiry.find().sort({ date: -1 }).lean();
    const merged = [...dbInquiries, ...fileInquiries].sort(
      (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );
    return NextResponse.json({ success: true, data: merged });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
