import type { z } from 'zod';
import type { projectAddSchema } from '@/lib/validators/project';
import { slugify } from '@/lib/utils';

type ProjectInput = z.infer<typeof projectAddSchema>;

export function buildProjectPayload(data: ProjectInput) {
  const title = data.projectName || data.title || 'Untitled Project';
  const slug = slugify(title);

  const gallery = normalizeGallery(data);
  const videos = data.videos?.filter(Boolean) ?? [];
  const videoFiles = data.videoFiles?.filter(Boolean) ?? [];
  const image = gallery[0] || data.image || data.imageData || '';

  return {
    id: slug,
    title,
    location: data.location || '',
    price: data.price || '',
    status: data.status || 'Available',
    description: data.description || '',
    image,
    gallery,
    category: data.category || 'Residential',
    details: {
      area: data.plotSize || '',
      totalArea: data.totalArea || '',
    },
    features: [] as string[],
    videos,
    videoFiles,
    youtubeId: data.youtubeId || videos[0] || '',
  };
}

function normalizeGallery(data: ProjectInput): string[] {
  if (data.gallery?.length) {
    return [...new Set(data.gallery.filter(Boolean))];
  }
  const single = data.image || data.imageData;
  return single ? [single] : [];
}

export function buildProjectUpdatePayload(data: ProjectInput) {
  const payload: Record<string, unknown> = {};

  if (data.projectName || data.title) {
    payload.title = data.projectName || data.title;
  }
  if (data.location !== undefined) payload.location = data.location;
  if (data.price !== undefined) payload.price = data.price;
  if (data.status !== undefined) payload.status = data.status;
  if (data.description !== undefined) payload.description = data.description;
  if (data.category !== undefined) payload.category = data.category;

  if (data.gallery !== undefined || data.image !== undefined || data.imageData !== undefined) {
    const gallery = normalizeGallery(data);
    payload.gallery = gallery;
    payload.image = gallery[0] || data.image || data.imageData || '';
  }

  if (data.plotSize !== undefined || data.totalArea !== undefined) {
    payload.details = {
      area: data.plotSize ?? '',
      totalArea: data.totalArea ?? '',
    };
  }

  if (data.videos !== undefined) {
    payload.videos = data.videos.filter(Boolean);
    payload.youtubeId = data.youtubeId || data.videos[0] || '';
  } else if (data.youtubeId !== undefined) {
    payload.youtubeId = data.youtubeId;
  }

  if (data.videoFiles !== undefined) {
    payload.videoFiles = data.videoFiles.filter(Boolean);
  }

  return payload;
}
