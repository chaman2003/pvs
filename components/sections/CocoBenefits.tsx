import Image from 'next/image';
import { Check } from 'lucide-react';
import { cocoBenefits } from '@/content/home-sections';
import { siteVideos } from '@/content/videos';
import { SectionHead } from '@/components/ui/SectionHead';
import { VideoModal } from '@/components/ui/VideoModal';
import { Reveal } from '@/components/motion/Reveal';

export function CocoBenefits() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead
          kicker={cocoBenefits.kicker}
          title={`${cocoBenefits.title} ${cocoBenefits.titleAccent}`}
          description={cocoBenefits.description}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-start">
          <Reveal>
            <div className="space-y-6">
              <h3 className="font-headline text-xl font-bold text-primary">Drive Times from Hosur</h3>
              <ul className="space-y-3">
                {cocoBenefits.driveTimes.map((d) => (
                  <li
                    key={d.destination}
                    className="flex justify-between items-center p-4 rounded-xl bg-surface-container-low border border-outline-variant/20"
                  >
                    <span className="text-on-surface-variant">{d.destination}</span>
                    <span className="font-headline font-bold text-secondary">{d.time}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 mt-6">
                {cocoBenefits.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-on-surface-variant">
                    <Check className="h-5 w-5 text-secondary shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <VideoModal
              videoId={siteVideos.walkthrough.id}
              label={siteVideos.walkthrough.label}
              poster={
                <Image
                  src="/images/amenity-hub-pool-aerial.png"
                  alt="PVS coco farmland amenities pool aerial Hosur"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
