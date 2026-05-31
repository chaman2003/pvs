import { cn } from '@/lib/utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'default' | 'footer';
};

export function Textarea({ className, variant = 'default', ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border px-4 py-3 text-sm resize-none transition-shadow',
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
