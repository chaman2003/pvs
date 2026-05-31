import { NextRequest, NextResponse } from 'next/server';
import { Inquiry } from '@/lib/models/Inquiry';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { requireAdmin } from '@/lib/api-auth';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const dbError = await requireDatabaseConnection();
  if (dbError) return dbError;

  try {
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: inquiry });
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

  const { id } = await params;
  const dbError = await requireDatabaseConnection();
  if (dbError) return dbError;

  try {
    const body = await request.json();
    const status = body.status || body.Status;
    const updated = await Inquiry.findByIdAndUpdate(id, { status, Status: status }, { new: true });
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

export async function DELETE(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const dbError = await requireDatabaseConnection();
  if (dbError) return dbError;

  try {
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
