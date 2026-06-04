'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { SiteImage } from '@/components/ui/SiteImage';
import { VideoPlayerModal } from '@/components/ui/VideoPlayerModal';
import type { ProjectVideoSlot } from '@/content/backup-project-media';

export function ProjectVideoPosterWall({
  slots,
  title,
}: {
  slots: ProjectVideoSlot[];
  title: string;
}) {
  const [active, setActive] = useState<ProjectVideoSlot | null>(null);

  if (slots.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {slots.map((slot, index) => (
          <button
            key={`video-slot-${index}`}
            type="button"
            onClick={() => setActive(slot)}
            className="group relative aspect-video rounded-xl overflow-hidden border-2 border-outline-variant/30 hover:border-secondary transition-colors"
          >
            <SiteImage
              src={slot.poster}
              alt={`${title} video ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-primary/35 group-hover:bg-primary/45 transition-colors">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-primary shadow-lg">
                <Play className="h-7 w-7 fill-primary ml-0.5" />
              </span>
            </span>
          </button>
        ))}
      </div>
      <VideoPlayerModal
        open={active != null}
        onClose={() => setActive(null)}
        videoId={active?.id ?? ''}
        title={`${title} video`}
      />
    </>
  );
}
