'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { SiteImage } from '@/components/ui/SiteImage';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import type { ProjectVideoItem } from '@/content/project-videos';
import { isUploadedVideoSrc, isYoutubeId, youtubeThumbnailUrl } from '@/lib/youtube';

function posterSrc(item: ProjectVideoItem): string | null {
  if (item.thumbnail) return item.thumbnail;
  if (isYoutubeId(item.id)) return youtubeThumbnailUrl(item.id);
  return null;
}

export function ProjectVideoGrid({
  items,
  title,
}: {
  items: ProjectVideoItem[];
  title: string;
}) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  const activeItem = items.find((v) => v.id === active) ?? items[0];

  return (
    <div className="space-y-4">
      {activeItem && (
        <VideoEmbed videoId={activeItem.id} title={`${title} video`} />
      )}
      {items.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item) => {
            const poster = posterSrc(item);
            const isFile = isUploadedVideoSrc(item.id);
            const selected = active === item.id;

            return (
              <button
                key={`${item.id}-${item.thumbnail ?? 'yt'}`}
                type="button"
                onClick={() => setActive(item.id)}
                className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-colors ${
                  selected
                    ? 'border-secondary ring-2 ring-secondary/30'
                    : 'border-outline-variant/30 hover:border-secondary'
                }`}
              >
                {poster ? (
                  <SiteImage
                    src={poster}
                    alt={`${title} video thumbnail`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary-container flex items-center justify-center">
                    <Play className="h-10 w-10 text-on-primary/80" />
                  </div>
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-10 w-10 text-on-primary fill-on-primary" />
                </span>
                {isFile && (
                  <span className="absolute bottom-1 left-1 text-[10px] font-bold uppercase bg-primary/80 text-on-primary px-1.5 py-0.5 rounded">
                    MP4
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
