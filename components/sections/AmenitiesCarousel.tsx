import { amenities } from '@/content/testimonials';
import { SectionHead } from '@/components/ui/SectionHead';
import { Shield, Droplets, Trees, Zap, Users, Map } from 'lucide-react';

const icons: Record<string, React.ElementType> = {
  shield: Shield,
  droplets: Droplets,
  trees: Trees,
  road: Map,
  zap: Zap,
  users: Users,
};

export function AmenitiesCarousel() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead kicker="Amenities" title="World-Class Facilities" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((a) => {
            const Icon = icons[a.icon] || Shield;
            return (
              <div
                key={a.title}
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:shadow-lg transition-shadow"
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
