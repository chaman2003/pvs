import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import type { IProject } from '@/lib/models/Project';

export function getProjectPageMetadata(project: IProject): Metadata {
  const title = project.seo?.title ?? project.title;
  const description =
    project.seo?.description ??
    `${project.title} at ${project.location}. ${project.description.slice(0, 120)}`;
  const ogImage = project.image.startsWith('http')
    ? project.image
    : `${siteConfig.url}${project.image}`;

  return createPageMetadata({
    title,
    description,
    path: `/projects/${project.id}`,
    ogImage,
  });
}

export function projectJsonLd(project: IProject) {
  const url = `${siteConfig.url}/projects/${project.id}`;
  const images = (project.gallery?.length ? project.gallery : [project.image]).map((src) =>
    src.startsWith('http') ? src : `${siteConfig.url}${src}`
  );

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: project.title,
      description: project.description,
      url,
      image: images,
      offers: {
        '@type': 'Offer',
        price: project.price ?? 'Enquire',
        priceCurrency: 'INR',
        availability:
          project.status?.toLowerCase() === 'sold'
            ? 'https://schema.org/SoldOut'
            : 'https://schema.org/InStock',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteConfig.url}/projects` },
        { '@type': 'ListItem', position: 3, name: project.title, item: url },
      ],
    },
  ];
}
