'use client';

import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type HeroBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeroBackground({ children, className }: HeroBackgroundProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <div className={cn('relative h-full w-full', !reducedMotion && 'animate-hero-zoom')}>
        {children}
      </div>
    </div>
  );
}
