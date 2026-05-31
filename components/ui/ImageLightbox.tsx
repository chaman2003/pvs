'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export type LightboxImage = { src: string; alt: string };

export function ImageLightbox({
  images,
  renderTrigger,
}: {
  images: LightboxImage[];
  renderTrigger: (open: (index: number) => void) => React.ReactNode;
}) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      {renderTrigger(setIndex)}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
}
