import {
  backupProjectMedia,
  getBackupMedia,
  type CocoProjectId,
  type ProjectVideoSlot,
} from '@/content/backup-project-media';

export type ProjectVideoItem = {
  id: string;
  thumbnail?: string;
};

function slotsToItems(slots: ProjectVideoSlot[]): ProjectVideoItem[] {
  return slots.map((s) => ({ id: s.id, thumbnail: s.poster }));
}

export const backupProjectVideos: Record<string, ProjectVideoItem[]> = Object.fromEntries(
  (Object.keys(backupProjectMedia) as CocoProjectId[]).map((id) => [
    id,
    slotsToItems([
      backupProjectMedia[id].leadVideo,
      ...backupProjectMedia[id].videoGrid,
    ]),
  ])
);

/** Non-coco: dedupe by YouTube ID. Coco: use ordered videoGrid from manifest. */
export function resolveProjectVideos(
  projectId: string,
  videoIds: string[] | undefined
): ProjectVideoItem[] {
  const backup = getBackupMedia(projectId);
  if (backup) {
    return slotsToItems(backup.videoGrid);
  }

  const fallback = backupProjectVideos[projectId];
  const ids =
    videoIds?.filter(Boolean).length
      ? [...new Set(videoIds!.filter(Boolean))]
      : fallback?.map((v) => v.id) ?? [];

  if (!ids.length) return [];

  const thumbById = new Map(fallback?.map((v) => [v.id, v.thumbnail]) ?? []);

  return ids.map((id) => ({
    id,
    thumbnail: thumbById.get(id),
  }));
}
