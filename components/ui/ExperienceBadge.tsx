import { cn } from '@/lib/utils';

type ExperienceBadgeProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'right';
  centered?: boolean;
  className?: string;
};

export function ExperienceBadge({
  title,
  subtitle,
  align = 'right',
  centered = false,
  className,
}: ExperienceBadgeProps) {
  return (
    <div
      className={cn(
        'relative z-10 w-full bg-secondary-container text-primary rounded-lg shadow-lg p-4',
        'md:absolute md:w-48 lg:w-56 md:p-5 md:shadow-xl md:-bottom-8',
        align === 'right' ? 'md:-right-4 lg:-right-8' : 'md:-left-4 lg:-left-8',
        centered && 'text-center',
        className
      )}
    >
      <p className={cn('font-headline font-bold', centered ? 'text-2xl md:text-4xl' : 'text-lg')}>
        {title}
      </p>
      {subtitle && (
        <p className={cn('text-sm mt-2 text-primary/90', centered && 'md:mt-1 font-medium')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
