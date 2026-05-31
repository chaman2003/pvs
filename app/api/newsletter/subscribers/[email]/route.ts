import { NextRequest, NextResponse } from 'next/server';
import { Newsletter } from '@/lib/models/Newsletter';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { requireAdmin } from '@/lib/api-auth';

type Params = { params: Promise<{ email: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { email } = await params;
  const dbError = await requireDatabaseConnection();
  if (dbError) return dbError;

  try {
    const subscriber = await Newsletter.findOne({ email: decodeURIComponent(email) });
    if (!subscriber) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: subscriber });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { email } = await params;
  const dbError = await requireDatabaseConnection();
  if (dbError) return dbError;

  try {
    const { status } = await request.json();
    const updated = await Newsletter.findOneAndUpdate(
      { email: decodeURIComponent(email) },
      { status },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Updated' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
