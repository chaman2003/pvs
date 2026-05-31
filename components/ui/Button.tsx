import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary/90',
    secondary: 'bg-secondary-container text-primary hover:opacity-90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-on-primary',
    ghost: 'text-primary hover:bg-primary/10',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-bold transition-all',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
