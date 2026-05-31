import { progressOverview } from '@/content/home-sections';
import { Reveal } from '@/components/motion/Reveal';

export function ProgressOverview() {
  return (
    <section className="py-16 bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[progressOverview.completed, progressOverview.ongoing].map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="p-8 rounded-2xl bg-on-primary/10 border border-on-primary/20 text-center">
                <p className="text-secondary-container text-sm font-bold uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="font-headline text-4xl md:text-5xl font-bold mt-2">
                  {item.value}
                  <span className="text-2xl text-on-primary/80 ml-2">{item.unit}</span>
                </p>
                <p className="text-on-primary/70 text-sm mt-3">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
