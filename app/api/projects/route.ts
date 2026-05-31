import { NextRequest, NextResponse } from 'next/server';
import { requireDatabaseConnection } from '@/lib/db/require-db';
import { Project } from '@/lib/models/Project';
import { requireAdmin } from '@/lib/api-auth';
import { projectAddSchema } from '@/lib/validators/project';
import { buildProjectPayload } from '@/lib/project-payload';
import { getAllProjects } from '@/lib/projects';

export async function GET(request: NextRequest) {
  const projects = await getAllProjects();
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const parsed = projectAddSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const dbError = await requireDatabaseConnection();
    if (dbError) return dbError;

    const newProject = new Project(buildProjectPayload(parsed.data));
    await newProject.save();
    return NextResponse.json(
      { success: true, message: 'Project added successfully', project: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    );
  }
}
