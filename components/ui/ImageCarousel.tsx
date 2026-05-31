'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CarouselImage = { src: string; alt: string };

export function ImageCarousel({
  images,
  className,
}: {
  images: CarouselImage[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? count - 1 : i - 1));
  }, [count]);

  const next = useCallback(() => {
    setIndex((i) => (i === count - 1 ? 0 : i + 1));
  }, [count]);

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
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="object-contain sm:object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority={index === 0}
        />
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/80 text-on-primary hover:bg-primary shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/80 text-on-primary hover:bg-primary shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
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
