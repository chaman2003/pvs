import { cn } from '@/lib/utils';

export function navLinkClassName(active: boolean, variant: 'desktop' | 'mobile') {
  if (variant === 'desktop') {
    return cn(
      'relative text-sm font-semibold transition-colors pb-1',
      active
        ? 'text-primary after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-secondary-container'
        : 'text-on-surface-variant hover:text-primary'
    );
  }
  return cn(
    'font-semibold py-2 pl-3 border-l-2 transition-colors',
    active
      ? 'text-primary border-secondary-container bg-primary/5'
      : 'text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant'
  );
}
