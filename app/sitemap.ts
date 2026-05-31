import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getProjectSlugs } from '@/lib/projects';
import { guideSlugs } from '@/content/guides';

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/projects', priority: 0.9 },
  { path: '/services', priority: 0.8 },
  { path: '/testimonials', priority: 0.8 },
  { path: '/faq', priority: 0.8 },
  { path: '/contact', priority: 0.9 },
  { path: '/guides', priority: 0.85 },
  { path: '/privacy-policy', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  let slugs: string[] = [];
  try {
    slugs = await getProjectSlugs();
  } catch {
    slugs = [];
  }

  const staticEntries = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority,
  }));

  const projectEntries = slugs.map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: ['phase-1', 'phase-2', 'shoolagiri'].includes(slug) ? 0.9 : 0.7,
  }));

  const guideEntries = guideSlugs.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...projectEntries, ...guideEntries];
}
