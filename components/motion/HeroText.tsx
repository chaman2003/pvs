'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroText({ children, className }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  return (
    <div className={cn(mounted && !reduced && 'animate-hero-fade', className)}>
      {children}
    </div>
  );
}
