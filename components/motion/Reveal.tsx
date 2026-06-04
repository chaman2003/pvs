'use client';

import { useEffect, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView({ threshold, once: true });

  useEffect(() => setMounted(true), []);

  const motionOn = mounted && !reduced;
  const visible = !motionOn || inView;

  return (
    <div
      ref={ref}
      className={cn(
        'reveal',
        motionOn && 'reveal-motion',
        visible && 'reveal-visible',
        className
      )}
      style={motionOn && visible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
