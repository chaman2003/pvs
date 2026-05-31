import { timelineEvents } from '@/content/timeline';
import { SectionHead } from '@/components/ui/SectionHead';

export function ProjectTimeline() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead kicker="Our Journey" title="PVS Promoters History" />
        <div className="relative border-l-2 border-secondary-container/50 ml-4 md:ml-8 space-y-10">
          {timelineEvents.map((event) => (
            <div key={event.year} className="relative pl-8 md:pl-12">
              <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-secondary-container border-4 border-background" />
              <p className="text-secondary font-bold text-sm">{event.year}</p>
              <h3 className="font-headline text-xl font-bold text-primary mt-1">{event.title}</h3>
              <p className="text-on-surface-variant mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
