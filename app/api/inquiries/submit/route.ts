import { NextRequest, NextResponse } from 'next/server';
import { Inquiry } from '@/lib/models/Inquiry';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { saveInquiryToFile } from '@/lib/inquiries/file-store';
import { inquirySchema } from '@/lib/validators/inquiry';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const dbError = await requireDatabaseConnection();
    if (!dbError) {
      const inquiry = new Inquiry(parsed.data);
      await inquiry.save();
      return NextResponse.json(
        { success: true, message: 'Inquiry submitted successfully' },
        { status: 201 }
      );
    }

    await saveInquiryToFile(parsed.data);
    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Submission failed' },
      { status: 500 }
    );
  }
}
