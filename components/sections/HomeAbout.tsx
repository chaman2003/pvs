import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { homeAbout } from '@/content/home-sections';
import { ExperienceBadge } from '@/components/ui/ExperienceBadge';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/lib/site-config';

export function HomeAbout() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative md:pb-12">
            <Reveal>
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/enhanced/coco-farm-clubhouse-aerial-1080w.webp"
                  alt="PVS Promoters coco farmland gated community aerial Hosur"
                  fill
                  className="object-cover hover-scale-img"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <ExperienceBadge
              title="17+ Years of Excellence"
              subtitle={`Delivering trust and luxury across the landscape since ${siteConfig.founded}.`}
              align="right"
              className="mt-4 md:mt-0"
            />
          </div>
          <Reveal delay={150}>
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                {homeAbout.title}{' '}
                <span className="text-secondary">{homeAbout.titleAccent}</span>
              </h2>
              {homeAbout.paragraphs.map((p) => (
                <p key={p.slice(0, 30)} className="text-on-surface-variant mb-4 leading-relaxed">
                  {p}
                </p>
              ))}
              <ul className="space-y-2 mb-8">
                {homeAbout.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-on-surface-variant">
                    <Check className="h-5 w-5 text-secondary shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="text-primary font-bold hover:text-secondary transition-colors">
                Learn more about us →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
