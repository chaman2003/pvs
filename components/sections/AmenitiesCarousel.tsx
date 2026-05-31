'use client';

import {
  Shield,
  Laptop,
  Wind,
  Sprout,
  Leaf,
  Waves,
  Brain,
  Carrot,
  Droplets,
  Home,
  Flame,
  BookOpen,
  ParkingCircle,
  Trophy,
  Theater,
} from 'lucide-react';
import { amenities, amenitiesSectionHead } from '@/content/amenities';
import { SectionHead } from '@/components/ui/SectionHead';

const icons: Record<string, React.ElementType> = {
  cctv: Shield,
  cowork: Laptop,
  air: Wind,
  farm: Sprout,
  nature: Leaf,
  swim: Waves,
  meditate: Brain,
  veggies: Carrot,
  ponds: Droplets,
  cottages: Home,
  bonfire: Flame,
  books: BookOpen,
  security: Shield,
  parking: ParkingCircle,
  cricket: Trophy,
  amphitheatre: Theater,
};

export function AmenitiesCarousel() {
  return (
    <section className="py-20 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead
          kicker={amenitiesSectionHead.kicker}
          title={amenitiesSectionHead.title}
          description={amenitiesSectionHead.subtitle}
        />
        <div className="flex gap-4 mt-10 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
          {amenities.map((a) => {
            const Icon = icons[a.icon] || Shield;
            return (
              <div
                key={a.title}
                className="snap-start shrink-0 w-64 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:shadow-lg transition-shadow"
              >
                <Icon className="h-8 w-8 text-secondary mb-4" />
                <h3 className="font-headline font-bold text-primary">{a.title}</h3>
                <p className="text-sm text-on-surface-variant mt-2">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
