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
    <>
      {/* Mobile: full-width card below image */}
      <div
        className={cn(
          'mt-4 md:hidden w-full bg-secondary-container text-primary p-4 rounded-lg shadow-lg',
          centered && 'text-center',
          className
        )}
      >
        <p className="font-headline font-bold text-lg">{title}</p>
        {subtitle && <p className="text-sm mt-2 opacity-90">{subtitle}</p>}
      </div>

      {/* Desktop: floating overlay */}
      <div
        className={cn(
          'hidden md:block absolute -bottom-8 w-48 lg:w-56 bg-secondary-container text-primary p-4 lg:p-5 rounded-lg shadow-xl',
          align === 'right' ? '-right-8' : '-left-8',
          centered && 'text-center',
          className
        )}
      >
        <p className={cn('font-headline font-bold', centered ? 'text-4xl' : 'text-lg')}>{title}</p>
        {subtitle && (
          <p className={cn('text-sm mt-2 opacity-90', centered && 'mt-1 font-medium')}>{subtitle}</p>
        )}
      </div>
    </>
  );
}
