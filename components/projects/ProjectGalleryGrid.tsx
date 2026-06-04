'use client';

import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { SiteImage } from '@/components/ui/SiteImage';
import { warmImageCache } from '@/lib/images';

export function ProjectGalleryGrid({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    warmImageCache(images.map((img) => img.src));
  }, [images]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant/20 hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <SiteImage
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
}
