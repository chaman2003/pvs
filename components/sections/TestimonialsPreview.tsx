'use client';

import { SiteImage } from '@/components/ui/SiteImage';
import { useState } from 'react';
import { testimonials } from '@/content/testimonials';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';

function TestimonialAvatar({ photo, name }: { photo?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!photo || failed) {
    return (
      <div className="h-14 w-14 shrink-0 rounded-full bg-primary/20 flex items-center justify-center font-headline font-bold text-primary">
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden bg-primary/10">
      <SiteImage
        src={photo}
        alt={`${name} — PVS Promoters customer review`}
        fill
        className="object-cover"
        sizes="56px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function TestimonialsPreview() {
  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <SectionHead
          kicker="Testimonials"
          title="Customer's Reviews"
          description="Hear from buyers who chose PVS Promoters for managed farmland near Bangalore."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 80}>
              <blockquote className="relative bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/30 hover-lift h-full flex gap-4">
                <TestimonialAvatar photo={t.photo} name={t.name} />
                <div>
                  <p className="text-on-surface italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 font-headline font-bold text-primary">{t.name}</footer>
                  <p className="text-xs text-secondary">{t.role}</p>
                </div>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
