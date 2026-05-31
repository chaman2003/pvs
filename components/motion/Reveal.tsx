'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

export function Reveal({ children, className, delay = 0, threshold = 0.15 }: RevealProps) {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ threshold, once: true });

  return (
    <div
      ref={ref}
      className={cn('reveal', (inView || reducedMotion) && 'reveal-visible', className)}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
