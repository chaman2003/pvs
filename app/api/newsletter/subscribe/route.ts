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

    const exists = await Newsletter.findOne({ email: parsed.data.email });
    if (exists) {
      if (exists.status === 'unsubscribed') {
        exists.status = 'active';
        await exists.save();
        return NextResponse.json({ success: true, message: 'Resubscribed successfully' });
      }
      return NextResponse.json({ success: false, error: 'Already subscribed' }, { status: 400 });
    }

    await new Newsletter({ email: parsed.data.email, status: 'active' }).save();
    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
