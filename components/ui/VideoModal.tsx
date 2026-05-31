'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { VideoEmbed } from '@/components/ui/VideoEmbed';

export function VideoModal({
  videoId,
  label,
  poster,
}: {
  videoId: string;
  label: string;
  poster?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-outline-variant/20 bg-primary/10 hover:shadow-lg transition-shadow"
        aria-label={`Play video: ${label}`}
      >
        {poster}
        <span className="absolute inset-0 flex items-center justify-center bg-primary/30 group-hover:bg-primary/40 transition-colors">
          <span className="flex items-center gap-2 bg-secondary-container text-primary px-5 py-3 rounded-full font-bold text-sm">
            <Play className="h-5 w-5 fill-current" />
            Play Short Video
          </span>
        </span>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-on-primary hover:text-secondary-container"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            <VideoEmbed videoId={videoId} title={label} />
          </div>
        </div>
      )}
    </>
  );
}
