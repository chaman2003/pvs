'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoEmbed } from '@/components/ui/VideoEmbed';

export function ProjectVideoGrid({
  videos,
  title,
}: {
  videos: string[];
  title: string;
}) {
  const [active, setActive] = useState<string | null>(videos[0] ?? null);

  if (videos.length === 0) return null;

  return (
    <div className="space-y-4">
      {active && <VideoEmbed videoId={active} title={`${title} video`} />}
      {videos.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {videos.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors ${
                active === id
                  ? 'border-secondary bg-secondary-container/30 text-primary'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-secondary'
              }`}
            >
              <Play className="h-4 w-4 shrink-0" />
              Watch
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
