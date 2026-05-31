'use client';

import { cn } from '@/lib/utils';

type HeroBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeroBackground({ children, className }: HeroBackgroundProps) {

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
