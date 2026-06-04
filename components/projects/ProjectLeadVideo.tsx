'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { SiteImage } from '@/components/ui/SiteImage';
import { VideoPlayerModal } from '@/components/ui/VideoPlayerModal';
import type { ProjectVideoSlot } from '@/content/backup-project-media';

export function ProjectLeadVideo({
  lead,
  title,
}: {
  lead: ProjectVideoSlot;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-outline-variant/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        aria-label={`Play ${title} featured video`}
      >
        <SiteImage
          src={lead.poster}
          alt={`${title} — featured video poster`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          critical
        />
        <span className="absolute inset-0 flex items-center justify-center bg-primary/35 group-hover:bg-primary/45 transition-colors">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-primary shadow-lg">
            <Play className="h-8 w-8 fill-primary ml-1" />
          </span>
        </span>
      </button>
      <VideoPlayerModal
        open={open}
        onClose={() => setOpen(false)}
        videoId={lead.id}
        title={`${title} featured video`}
      />
    </>
  );
}
