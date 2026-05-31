'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getWarmupImages } from '@/lib/critical-images';
import { warmImageCache } from '@/lib/images';

export function RouteImageWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    warmImageCache(getWarmupImages(pathname ?? '/'));
  }, [pathname]);

  return null;
}
