'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

export function ProjectGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <ImageCarousel
        images={images}
        onOpenFullscreen={(index) => setLightboxIndex(index)}
      />
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
}
