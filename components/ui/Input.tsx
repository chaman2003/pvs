import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'footer';
};

export function Input({ className, variant = 'default', ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border px-4 py-3 text-sm transition-shadow',
        'focus:ring-2 focus:ring-primary/30',
        variant === 'default' &&
          'border-outline-variant/40 bg-surface-container-lowest text-on-surface placeholder:text-outline',
        variant === 'footer' &&
          'border-on-primary/20 bg-on-primary/10 text-on-primary placeholder:text-on-primary/50',
        className
      )}
      {...props}
    />
  );
}
