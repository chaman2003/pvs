import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getProjectSlugs } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/services',
    '/testimonials',
    '/faq',
    '/contact',
    '/privacy-policy',
    '/projects/phase-1',
    '/projects/phase-2',
    '/projects/shoolagiri',
    '/projects/emerald-estate',
  ];

  let slugs: string[] = [];
  try {
    slugs = await getProjectSlugs();
  } catch {
    slugs = [];
  }

  const now = new Date();
  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...slugs.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
