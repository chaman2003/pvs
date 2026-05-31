import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Project } from '@/lib/models/Project';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { requireAdmin } from '@/lib/api-auth';
import { projectUpdateSchema } from '@/lib/validators/project';
import { buildProjectUpdatePayload } from '@/lib/project-payload';
import { getProjectBySlug } from '@/lib/projects';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const project = await getProjectBySlug(id);
  if (!project) {
    return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: project });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const dbError = await requireDatabaseConnection();
  if (dbError) return dbError;

  try {
    const body = await request.json();
    const parsed = projectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const updateData = buildProjectUpdatePayload(parsed.data);

    let updated = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Project.findByIdAndUpdate(id, updateData, { new: true });
    }
    if (!updated) {
      updated = await Project.findOneAndUpdate({ id }, updateData, { new: true });
    }

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed' },
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
    let deleted = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deleted = await Project.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await Project.findOneAndDelete({ id });
    }
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
