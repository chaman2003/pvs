import { cn } from '@/lib/utils';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface px-4 py-3 text-sm',
        'focus:ring-2 focus:ring-primary/30',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
