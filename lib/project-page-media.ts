import {
  backupProjectMedia,
  getBackupMedia,
  isCocoProject,
  type BackupProjectMedia,
  type CocoProjectId,
  type ProjectVideoSlot,
  type SidebarThumb,
} from '@/content/backup-project-media';
import type { IProject } from '@/lib/models/Project';
import { youtubeThumbnailUrl } from '@/lib/youtube';

export type ProjectPageMedia = {
  heroBanner: string;
  bannerTitle: string;
  gallery: string[];
  leadVideo: ProjectVideoSlot | null;
  videoGrid: ProjectVideoSlot[];
  sidebarThumbs: SidebarThumb[];
  warmupUrls: string[];
};

function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))];
}

/** Merge DB fields over backup defaults for coco farmland projects. */
export function mergeCocoMedia(project: IProject): BackupProjectMedia {
  const base = backupProjectMedia[project.id as CocoProjectId];
  return {
    ...base,
    heroBanner: project.image || base.heroBanner,
    gallery: project.gallery?.length ? project.gallery : base.gallery,
    bannerTitle: project.bannerTitle || base.bannerTitle,
    leadVideo: project.leadVideo?.id
      ? { id: project.leadVideo.id, poster: project.leadVideo.poster || base.leadVideo.poster }
      : base.leadVideo,
    videoGrid:
      project.videoGrid?.length && project.videoGrid.every((s) => s.id)
        ? project.videoGrid.map((s) => ({
            id: s.id,
            poster: s.poster || base.leadVideo.poster,
          }))
        : base.videoGrid,
  };
}

/** Build page media for non-coco projects from DB (same layout as backup pages). */
export function buildMediaFromProject(project: IProject): ProjectPageMedia {
  const gallery = project.gallery?.length ? project.gallery : [project.image].filter(Boolean);
  const hero = project.image || gallery[0] || '';

  const leadId = project.leadVideo?.id || project.youtubeId || project.videos?.[0] || '';
  const leadVideo: ProjectVideoSlot | null = leadId
    ? {
        id: leadId,
        poster:
          project.leadVideo?.poster ||
          gallery[0] ||
          hero ||
          youtubeThumbnailUrl(leadId),
      }
    : null;

  let videoGrid: ProjectVideoSlot[] = [];
  if (project.videoGrid?.length) {
    videoGrid = project.videoGrid;
  } else if (project.videos?.length) {
    videoGrid = project.videos.map((id, i) => ({
      id,
      poster: gallery[i % gallery.length] || hero || youtubeThumbnailUrl(id),
    }));
  }

  const warmupUrls = uniqueUrls([
    hero,
    ...gallery,
    ...(leadVideo ? [leadVideo.poster] : []),
    ...videoGrid.map((v) => v.poster),
  ]);

  return {
    heroBanner: hero,
    bannerTitle: project.bannerTitle || project.title,
    gallery,
    leadVideo,
    videoGrid,
    sidebarThumbs: [],
    warmupUrls,
  };
}

/** Single resolver used by all project detail pages. */
export function resolveProjectPageMedia(project: IProject): ProjectPageMedia {
  if (isCocoProject(project.id)) {
    const merged = mergeCocoMedia(project);
    return {
      heroBanner: merged.heroBanner,
      bannerTitle: merged.bannerTitle,
      gallery: merged.gallery,
      leadVideo: merged.leadVideo,
      videoGrid: merged.videoGrid,
      sidebarThumbs: merged.sidebarThumbs,
      warmupUrls: uniqueUrls([
        merged.heroBanner,
        ...merged.gallery,
        merged.leadVideo.poster,
        ...merged.videoGrid.map((v) => v.poster),
        ...merged.sidebarThumbs.map((t) => t.image),
      ]),
    };
  }
  return buildMediaFromProject(project);
}

/** Full media document for MongoDB seed / sync / admin restore. */
export function getCocoMediaDocument(projectId: CocoProjectId) {
  const m = backupProjectMedia[projectId];
  return {
    image: m.heroBanner,
    gallery: m.gallery,
    bannerTitle: m.bannerTitle,
    youtubeId: m.leadVideo.id,
    videos: [...new Set([m.leadVideo.id, ...m.videoGrid.map((v) => v.id)])],
    leadVideo: m.leadVideo,
    videoGrid: m.videoGrid,
  };
}

export { isCocoProject, getBackupMedia };
