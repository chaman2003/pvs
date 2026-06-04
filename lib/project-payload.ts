import type { z } from 'zod';
import type { projectAddSchema } from '@/lib/validators/project';
import { slugify } from '@/lib/utils';
import type { ProjectVideoSlot } from '@/content/backup-project-media';

type ProjectInput = z.infer<typeof projectAddSchema>;

export function buildProjectPayload(data: ProjectInput) {
  const title = data.projectName || data.title || 'Untitled Project';
  const slug = slugify(title);

  const gallery = normalizeGallery(data);
  const videos = data.videos?.filter(Boolean) ?? [];
  const videoFiles = data.videoFiles?.filter(Boolean) ?? [];
  const image = gallery[0] || data.image || data.imageData || '';

  const leadVideo = normalizeLeadVideo(data);
  const videoGrid = normalizeVideoGrid(data);

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
    bannerTitle: data.bannerTitle || title,
    leadVideo,
    videoGrid,
    details: {
      area: data.plotSize || '',
      totalArea: data.totalArea || '',
    },
    features: [] as string[],
    videos,
    videoFiles,
    youtubeId: data.youtubeId || leadVideo?.id || videos[0] || '',
    seo: {
      title,
      description: data.description || '',
    },
  };
}

function normalizeLeadVideo(data: ProjectInput): ProjectVideoSlot | undefined {
  if (data.leadVideo?.id) {
    const gallery = normalizeGallery(data);
    return {
      id: data.leadVideo.id,
      poster: data.leadVideo.poster || gallery[0] || data.image || data.imageData || '',
    };
  }
  const id = data.youtubeId || data.videos?.[0];
  if (!id) return undefined;
  const gallery = normalizeGallery(data);
  return {
    id,
    poster: gallery[0] || data.image || data.imageData || '',
  };
}

function normalizeVideoGrid(data: ProjectInput): ProjectVideoSlot[] | undefined {
  if (data.videoGrid?.length) {
    const gallery = normalizeGallery(data);
    const cover = gallery[0] || data.image || data.imageData || '';
    return data.videoGrid.map((slot, i) => ({
      id: slot.id,
      poster: slot.poster || gallery[i % gallery.length] || cover,
    }));
  }
  const videos = data.videos?.filter(Boolean);
  if (!videos?.length) return undefined;
  const gallery = normalizeGallery(data);
  const cover = gallery[0] || data.image || data.imageData || '';
  return videos.map((id, i) => ({
    id,
    poster: gallery[i % gallery.length] || cover,
  }));
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

  if (data.bannerTitle !== undefined) payload.bannerTitle = data.bannerTitle;
  if (data.leadVideo !== undefined) payload.leadVideo = data.leadVideo;
  if (data.videoGrid !== undefined) payload.videoGrid = data.videoGrid;

  if (data.videos !== undefined) {
    payload.videos = data.videos.filter(Boolean);
    payload.youtubeId = data.youtubeId || data.leadVideo?.id || data.videos[0] || '';
  } else if (data.youtubeId !== undefined) {
    payload.youtubeId = data.youtubeId;
  } else if (data.leadVideo?.id) {
    payload.youtubeId = data.leadVideo.id;
  }

  if (data.videoFiles !== undefined) {
    payload.videoFiles = data.videoFiles.filter(Boolean);
  }

  const title = data.projectName || data.title;
  if (title || data.description !== undefined) {
    payload.seo = {
      title: title ?? '',
      description: data.description ?? '',
    };
  }

  return payload;
}
