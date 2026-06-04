/**
 * Canonical media manifest from pvspromoters_backup project HTML pages.
 * Source: coco-farmland-projects-Pathakotta.html, Pathakotta-2.html, shoolagiri.html
 */

const IMG = '/images';

export type ProjectVideoSlot = {
  id: string;
  poster: string;
};

export type BackupProjectMedia = {
  heroBanner: string;
  leadVideo: ProjectVideoSlot;
  gallery: string[];
  videos: ProjectVideoSlot[];
  /** Filenames under pvspromoters_backup/assets/images/ */
  assetFiles: string[];
};

function img(file: string): string {
  return `${IMG}/${file}`;
}

export const COCO_PROJECT_IDS = ['phase-1', 'phase-2', 'shoolagiri'] as const;
export type CocoProjectId = (typeof COCO_PROJECT_IDS)[number];

export const backupProjectMedia: Record<CocoProjectId, BackupProjectMedia> = {
  'phase-1': {
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
    videos: [
      { id: 'I8oYfqJXVz4', poster: img('img18.jpg') },
      { id: 'MFFPP6BPYik', poster: img('img18.jpg') },
      { id: 'UiBCDHTRM2U', poster: img('img19.jpg') },
      { id: 'WszjDmn56oo', poster: img('img20.jpg') },
    ],
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
    ],
  },
  'phase-2': {
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
    videos: [
      { id: 'I8oYfqJXVz4', poster: img('img24.jpg') },
      { id: 'MFFPP6BPYik', poster: img('img77.jpg') },
      { id: 'UiBCDHTRM2U', poster: img('img76.jpg') },
      { id: 'WszjDmn56oo', poster: img('img78.jpg') },
    ],
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
    ],
  },
  shoolagiri: {
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
    videos: [
      { id: 'NIKcPoE3uwY', poster: img('img7.jpg') },
      { id: 'UiBCDHTRM2U', poster: img('img27.jpg') },
      { id: 'WszjDmn56oo', poster: img('img28.jpg') },
    ],
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
    ],
  },
};

export function getBackupMedia(projectId: string): BackupProjectMedia | undefined {
  return backupProjectMedia[projectId as CocoProjectId];
}

export function getLeadVideo(projectId: string): ProjectVideoSlot | undefined {
  return getBackupMedia(projectId)?.leadVideo;
}

/** Unique asset filenames across all coco project pages. */
export function getAllBackupAssetFiles(): string[] {
  const set = new Set<string>();
  for (const id of COCO_PROJECT_IDS) {
    for (const file of backupProjectMedia[id].assetFiles) {
      set.add(file);
    }
  }
  return [...set].sort();
}

/** Media fields to sync into MongoDB / seed for coco projects. */
export function getCocoMediaPayload(projectId: CocoProjectId) {
  const m = backupProjectMedia[projectId];
  return {
    image: m.heroBanner,
    gallery: m.gallery,
    youtubeId: m.leadVideo.id,
    videos: m.videos.map((v) => v.id),
  };
}
