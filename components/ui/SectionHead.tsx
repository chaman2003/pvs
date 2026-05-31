'use client';

import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';

export function SectionHead({
  kicker,
  title,
  description,
  className,
  align = 'center',
}: {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal className={cn(align === 'center' && 'text-center', 'mb-12', className)}>
      {kicker && (
        <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-3 opacity-80">
          {kicker}
        </p>
      )}
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{title}</h2>
      {description && (
        <p className={cn('mt-4 text-on-surface-variant max-w-2xl text-lg', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
