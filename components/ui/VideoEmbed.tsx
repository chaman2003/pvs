'use client';

import { isUploadedVideoSrc, isYoutubeId, parseYoutubeInput } from '@/lib/youtube';

export function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const src = videoId.trim();
  const youtubeId = isYoutubeId(src) ? src : parseYoutubeInput(src);

  if (youtubeId) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container">
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${youtubeId}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (isUploadedVideoSrc(src) || src.startsWith('http')) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden border border-outline-variant/20 bg-black">
        <video src={src} controls className="w-full h-full object-contain" preload="metadata">
          <track kind="captions" />
        </video>
      </div>
    );
  }

  return null;
}
