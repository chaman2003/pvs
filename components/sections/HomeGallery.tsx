'use client';

import Image from 'next/image';
import galleryData from '@/content/gallery.json';
import { ImageLightbox } from '@/components/ui/ImageLightbox';
import { SectionHead } from '@/components/ui/SectionHead';

const images = galleryData as { src: string; alt: string }[];

export function HomeGallery() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead kicker="Gallery" title="PVS Farmland" description="Explore our coco farmland and gated community projects." />
        <ImageLightbox
          images={images}
          renderTrigger={(open) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => open(i)}
                  className="relative aspect-square rounded-xl overflow-hidden group w-full"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={i < 4}
                    loading={i < 8 ? 'eager' : 'lazy'}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </button>
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
}
