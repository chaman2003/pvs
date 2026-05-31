import { SiteImage } from '@/components/ui/SiteImage';
import Link from 'next/link';
import { Shield, Headphones, Award, Trees } from 'lucide-react';
import { homeServices } from '@/content/home-sections';
import { siteVideos } from '@/content/videos';
import { VideoModal } from '@/components/ui/VideoModal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/lib/site-config';

const iconMap = {
  shield: Shield,
  headphones: Headphones,
  badge: Award,
  trees: Trees,
} as const;

export function ServicesHighlight() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead
          kicker={homeServices.kicker}
          title={`${homeServices.title} ${homeServices.titleAccent}`}
          description={homeServices.description}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {homeServices.cards.map((card, i) => {
              const Icon = iconMap[card.icon];
              return (
                <Reveal key={card.title} delay={i * 80}>
                  <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover-lift h-full">
                    <Icon className="h-8 w-8 text-secondary mb-4" />
                    <h3 className="font-headline font-bold text-primary">{card.title}</h3>
                    <p className="text-sm text-on-surface-variant mt-2">{card.description}</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="inline-block mt-4 text-sm font-bold text-primary hover:text-secondary"
                    >
                      Book Now →
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={150}>
            <VideoModal
              videoId={siteVideos.hero.id}
              label={siteVideos.hero.label}
              poster={
                <SiteImage
                  src="/images/coco-farm-clubhouse-aerial.png"
                  alt="PVS Promoters coco farmland aerial view Hosur"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              }
            />
          </Reveal>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-primary text-on-primary hover:opacity-90"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
