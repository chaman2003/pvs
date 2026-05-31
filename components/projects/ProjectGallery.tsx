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
  const [index, setIndex] = useState(-1);

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className="w-full text-left"
        aria-label="Open gallery lightbox"
      >
        <ImageCarousel images={images} />
      </button>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
}
