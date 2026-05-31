import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { requireAdmin } from '@/lib/api-auth';
import { slugify } from '@/lib/utils';

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads', 'projects');

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime']);

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

function safeProjectId(raw: string): string {
  const slug = slugify(raw || 'general');
  return slug || 'general';
}

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const projectId = safeProjectId(String(formData.get('projectId') || 'general'));
    const type = String(formData.get('type') || 'image');

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const isVideo = type === 'video';
    const allowedTypes = isVideo ? VIDEO_TYPES : IMAGE_TYPES;
    const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { success: false, error: `Invalid file type: ${file.type || 'unknown'}` },
        { status: 400 }
      );
    }

    if (file.size > maxBytes) {
      return NextResponse.json(
        { success: false, error: `File too large (max ${isVideo ? '100MB' : '5MB'})` },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name) || (isVideo ? '.mp4' : '.jpg');
    const filename = `${Date.now()}-${safeFilename(path.basename(file.name, ext))}${ext}`;
    const dir = path.join(UPLOAD_ROOT, projectId);
    await mkdir(dir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const diskPath = path.join(dir, filename);
    await writeFile(diskPath, buffer);

    const url = `/uploads/projects/${projectId}/${filename}`;
    return NextResponse.json({ success: true, url, type: isVideo ? 'video' : 'image' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
