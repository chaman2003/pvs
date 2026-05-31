'use client';

import { useEffect } from 'react';
import type { IProject } from '@/lib/models/Project';
import { warmImageCache } from '@/lib/images';

/** Preload featured project thumbnails as soon as the section mounts. */
export function FeaturedProjectsWarmup({ projects }: { projects: IProject[] }) {
  useEffect(() => {
    warmImageCache(projects.map((p) => p.image).filter(Boolean));
  }, [projects]);

  return null;
}
