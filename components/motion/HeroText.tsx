'use client';

import { cn } from '@/lib/utils';

export function HeroText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('animate-fade-in-hero', className)}>{children}</div>;
}
