'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type CarouselImage = { src: string; alt: string };

function isUploadedImage(src: string) {
  return src.startsWith('/uploads/');
}

export function ImageCarousel({
  images,
  className,
  onOpenFullscreen,
}: {
  images: CarouselImage[];
  className?: string;
  onOpenFullscreen?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const prev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIndex((i) => (i === 0 ? count - 1 : i - 1));
    },
    [count]
  );

  const next = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIndex((i) => (i === count - 1 ? 0 : i + 1));
    },
    [count]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  if (count === 0) return null;

  return (
    <div className={cn('relative', className)} role="region" aria-label="Project gallery">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/20">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            loading={i < 3 ? 'eager' : 'lazy'}
            unoptimized={isUploadedImage(img.src)}
            className={cn(
              'absolute inset-0 object-contain sm:object-cover transition-opacity duration-300',
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        ))}
        {onOpenFullscreen && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFullscreen(index);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-primary/80 text-on-primary hover:bg-primary shadow-lg"
            aria-label="View fullscreen"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        )}
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary/80 text-on-primary hover:bg-primary shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary/80 text-on-primary hover:bg-primary shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === index ? 'w-6 bg-primary' : 'w-2 bg-outline-variant/50'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
