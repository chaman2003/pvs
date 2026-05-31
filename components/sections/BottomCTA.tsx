import { SiteImage } from '@/components/ui/SiteImage';
import Link from 'next/link';
import { bottomCta } from '@/content/home-sections';
import { Reveal } from '@/components/motion/Reveal';

export function BottomCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <SiteImage
        src="/images/enhanced/coco-farm-clubhouse-aerial-1920w.webp"
        alt="PVS Promoters luxury coco farmland clubhouse aerial Hosur"
        fill
        className="object-cover brightness-[0.4]"
        sizes="100vw"
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center text-on-primary">
        <Reveal>
          <p className="text-secondary-container font-bold uppercase tracking-widest text-sm mb-4">
            {bottomCta.kicker}
          </p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold leading-tight">
            {bottomCta.title}{' '}
            <span className="text-secondary-container">{bottomCta.titleAccent}</span>
          </h2>
          <p className="mt-6 text-on-primary/90 text-lg">{bottomCta.description}</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center mt-10 px-10 py-4 rounded-full font-bold bg-secondary-container text-primary hover:opacity-90 transition-opacity text-lg"
          >
            {bottomCta.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
