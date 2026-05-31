import Image from 'next/image';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/images/logo.png';

type SiteLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function SiteLogo({ size = 40, className, priority = false }: SiteLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="PVS Promoters"
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={cn('rounded-lg object-contain shrink-0', className)}
    />
  );
}
