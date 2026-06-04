'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { VideoEmbed } from '@/components/ui/VideoEmbed';

export function VideoPlayerModal({
  open,
  onClose,
  videoId,
  title,
}: {
  open: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || !videoId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-11 right-0 p-2 rounded-full text-on-primary hover:text-secondary-container transition-colors"
          aria-label="Close video"
        >
          <X className="h-8 w-8" />
        </button>
        <VideoEmbed videoId={videoId} title={title} />
      </div>
    </div>
  );
}
