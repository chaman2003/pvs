/**
 * Canonical media manifest from pvspromoters_backup project HTML pages.
 * Canonical defaults for coco projects; public pages merge DB overrides on top.
 */

const IMG = '/images';

export type ProjectVideoSlot = {
  id: string;
  poster: string;
};

export type SidebarThumb = {
  image: string;
  label: string;
  href: string;
};

export type BackupProjectMedia = {
  bannerTitle: string;
  heroBanner: string;
  leadVideo: ProjectVideoSlot;
  gallery: string[];
  /** Ordered poster tiles below gallery (duplicates allowed). */
  videoGrid: ProjectVideoSlot[];
  sidebarThumbs: SidebarThumb[];
  assetFiles: string[];
};

function img(file: string): string {
  return `${IMG}/${file}`;
}

const SIDEBAR_THUMBS: SidebarThumb[] = [
  {
    image: img('img7.jpg'),
    label: 'Luxury Coco Farmland near Hosur',
    href: '/projects',
  },
  {
    image: img('img8.jpg'),
    label: 'Luxury Coco Farmland near Hosur',
    href: '/projects',
  },
  {
    image: img('img15.jpg'),
    label: 'Luxury Coco Farmland near Hosur',
    href: '/projects',
  },
];

export const COCO_PROJECT_IDS = ['phase-1', 'phase-2', 'shoolagiri'] as const;
export type CocoProjectId = (typeof COCO_PROJECT_IDS)[number];

export const backupProjectMedia: Record<CocoProjectId, BackupProjectMedia> = {
  'phase-1': {
    bannerTitle: 'Gated Community Farmland Project',
    heroBanner: img('inner-banner-img-1.jpg'),
    leadVideo: { id: 'I8oYfqJXVz4', poster: img('img18.jpg') },
    gallery: [
      img('gallery-img1.jpg'),
      img('gallery-img2.jpg'),
      img('gallery-img3.jpg'),
      img('img2.jpg'),
      img('gallery-img4.jpg'),
      img('gallery-img5.jpg'),
      img('gallery-img6.jpg'),
      img('gallery-img8.jpg'),
    ],
    videoGrid: [
      { id: 'MFFPP6BPYik', poster: img('img18.jpg') },
      { id: 'UiBCDHTRM2U', poster: img('img19.jpg') },
      { id: 'WszjDmn56oo', poster: img('img20.jpg') },
      { id: 'WszjDmn56oo', poster: img('img21.jpg') },
      { id: 'WszjDmn56oo', poster: img('img22.jpg') },
      { id: 'WszjDmn56oo', poster: img('img23.jpg') },
    ],
    sidebarThumbs: SIDEBAR_THUMBS,
    assetFiles: [
      'inner-banner-img-1.jpg',
      'gallery-img1.jpg',
      'gallery-img2.jpg',
      'gallery-img3.jpg',
      'img2.jpg',
      'gallery-img4.jpg',
      'gallery-img5.jpg',
      'gallery-img6.jpg',
      'gallery-img8.jpg',
      'img18.jpg',
      'img19.jpg',
      'img20.jpg',
      'img21.jpg',
      'img22.jpg',
      'img23.jpg',
      'img7.jpg',
      'img8.jpg',
      'img15.jpg',
    ],
  },
  'phase-2': {
    bannerTitle: 'Gated Community Farmland Project',
    heroBanner: img('inner-banner-img-1.jpg'),
    leadVideo: { id: 'I8oYfqJXVz4', poster: img('img24.jpg') },
    gallery: [
      img('gallery-img11.jpg'),
      img('gallery-img12.jpg'),
      img('gallery-img13.jpg'),
      img('gallery-img17.jpg'),
      img('gallery-img14.jpg'),
      img('gallery-img15.jpg'),
      img('gallery-img16.jpg'),
      img('gallery-img18.jpg'),
    ],
    videoGrid: [
      { id: 'MFFPP6BPYik', poster: img('img77.jpg') },
      { id: 'UiBCDHTRM2U', poster: img('img76.jpg') },
      { id: 'WszjDmn56oo', poster: img('img78.jpg') },
      { id: 'MFFPP6BPYik', poster: img('img18.jpg') },
      { id: 'UiBCDHTRM2U', poster: img('img19.jpg') },
      { id: 'WszjDmn56oo', poster: img('img20.jpg') },
    ],
    sidebarThumbs: SIDEBAR_THUMBS,
    assetFiles: [
      'inner-banner-img-1.jpg',
      'gallery-img11.jpg',
      'gallery-img12.jpg',
      'gallery-img13.jpg',
      'gallery-img17.jpg',
      'gallery-img14.jpg',
      'gallery-img15.jpg',
      'gallery-img16.jpg',
      'gallery-img18.jpg',
      'img24.jpg',
      'img77.jpg',
      'img76.jpg',
      'img78.jpg',
      'img18.jpg',
      'img19.jpg',
      'img20.jpg',
      'img7.jpg',
      'img8.jpg',
      'img15.jpg',
    ],
  },
  shoolagiri: {
    bannerTitle: 'Coco Farmland Project Details',
    heroBanner: img('inner-banner-img-1.jpg'),
    leadVideo: { id: 'NIKcPoE3uwY', poster: img('img7.jpg') },
    gallery: [
      img('gallery-img21.jpg'),
      img('gallery-img22.jpg'),
      img('gallery-img23.jpg'),
      img('gallery-img27.jpg'),
      img('gallery-img24.jpg'),
      img('gallery-img25.jpg'),
      img('gallery-img26.jpg'),
      img('gallery-img28.jpg'),
    ],
    videoGrid: [
      { id: 'UiBCDHTRM2U', poster: img('img27.jpg') },
      { id: 'WszjDmn56oo', poster: img('img28.jpg') },
      { id: 'WszjDmn56oo', poster: img('img29.jpg') },
      { id: 'WszjDmn56oo', poster: img('img30.jpg') },
    ],
    sidebarThumbs: SIDEBAR_THUMBS,
    assetFiles: [
      'inner-banner-img-1.jpg',
      'gallery-img21.jpg',
      'gallery-img22.jpg',
      'gallery-img23.jpg',
      'gallery-img27.jpg',
      'gallery-img24.jpg',
      'gallery-img25.jpg',
      'gallery-img26.jpg',
      'gallery-img28.jpg',
      'img7.jpg',
      'img27.jpg',
      'img28.jpg',
      'img29.jpg',
      'img30.jpg',
      'img8.jpg',
      'img15.jpg',
    ],
  },
};

export function isCocoProject(projectId: string): projectId is CocoProjectId {
  return (COCO_PROJECT_IDS as readonly string[]).includes(projectId);
}

export function getBackupMedia(projectId: string): BackupProjectMedia | undefined {
  if (!isCocoProject(projectId)) return undefined;
  return backupProjectMedia[projectId];
}

export function getLeadVideo(projectId: string): ProjectVideoSlot | undefined {
  return getBackupMedia(projectId)?.leadVideo;
}

export function getAllBackupAssetFiles(): string[] {
  const set = new Set<string>();
  for (const id of COCO_PROJECT_IDS) {
    for (const file of backupProjectMedia[id].assetFiles) {
      set.add(file);
    }
  }
  return [...set].sort();
}

/** All image URLs to preload for a coco project page. */
export function getCocoWarmupUrls(projectId: CocoProjectId): string[] {
  const m = backupProjectMedia[projectId];
  return [
    m.heroBanner,
    ...m.gallery,
    m.leadVideo.poster,
    ...m.videoGrid.map((v) => v.poster),
    ...m.sidebarThumbs.map((t) => t.image),
  ];
}

/** Unique YouTube IDs for admin/API seed sync. */
export function getCocoUniqueVideoIds(projectId: CocoProjectId): string[] {
  const m = backupProjectMedia[projectId];
  const ids = [m.leadVideo.id, ...m.videoGrid.map((v) => v.id)];
  return [...new Set(ids)];
}

/** @deprecated Use getCocoMediaDocument from lib/project-page-media.ts */
export function getCocoMediaPayload(projectId: CocoProjectId) {
  const m = backupProjectMedia[projectId];
  return {
    image: m.heroBanner,
    gallery: m.gallery,
    youtubeId: m.leadVideo.id,
    videos: getCocoUniqueVideoIds(projectId),
    bannerTitle: m.bannerTitle,
    leadVideo: m.leadVideo,
    videoGrid: m.videoGrid,
  };
}
