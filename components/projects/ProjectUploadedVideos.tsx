'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoPlayerModal } from '@/components/ui/VideoPlayerModal';

export function ProjectUploadedVideos({
  sources,
  title,
}: {
  sources: string[];
  title: string;
}) {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  if (sources.length === 0) return null;

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {sources.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveSrc(src)}
            className="group relative aspect-video rounded-xl overflow-hidden border border-outline-variant/20 bg-primary-container focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <video
              src={src}
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-primary/40 group-hover:bg-primary/50 transition-colors">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-primary shadow-lg">
                <Play className="h-7 w-7 fill-primary ml-0.5" />
              </span>
            </span>
          </button>
        ))}
      </div>
      <VideoPlayerModal
        open={activeSrc != null}
        onClose={() => setActiveSrc(null)}
        videoId={activeSrc ?? ''}
        title={`${title} uploaded video`}
      />
    </>
  );
}
