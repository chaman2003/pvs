import { SiteImage } from '@/components/ui/SiteImage';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/images/logo.png';

type SiteLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function SiteLogo({ size = 40, className, priority = true }: SiteLogoProps) {
  return (
    <SiteImage
      src={LOGO_SRC}
      alt="PVS Promoters"
      width={size}
      height={size}
      critical={priority}
      className={cn('rounded-lg object-contain shrink-0', className)}
    />
  );
}
