'use client';

import { useEffect, useRef, useState } from 'react';
import { homeStats } from '@/content/testimonials';
import { Reveal } from '@/components/motion/Reveal';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(value / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else setCount(start);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
        {count}
        {suffix}
      </p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-primary/5">
      <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {homeStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div>
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="text-center text-xs sm:text-sm text-on-surface-variant mt-2 font-medium px-1">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
