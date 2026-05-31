import { NextRequest, NextResponse } from 'next/server';
import { Newsletter } from '@/lib/models/Newsletter';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { newsletterSchema } from '@/lib/validators/newsletter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 });
    }

    const dbError = await requireDatabaseConnection();
    if (dbError) return dbError;

    const updated = await Newsletter.findOneAndUpdate(
      { email: parsed.data.email },
      { status: 'unsubscribed' },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
