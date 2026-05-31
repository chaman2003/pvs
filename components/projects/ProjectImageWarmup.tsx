'use client';

import { useEffect } from 'react';
import { warmImageCache } from '@/lib/images';

export function ProjectImageWarmup({ urls }: { urls: string[] }) {
  useEffect(() => {
    warmImageCache(urls.filter(Boolean));
  }, [urls]);

  return null;
}
