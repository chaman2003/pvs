import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function createPageMetadata({
  title,
  description,
  path = '/',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: `${siteConfig.url}/images/logo.jpg`, width: 400, height: 400 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address,
    addressLocality: 'Hosur',
    addressRegion: 'Tamil Nadu',
    postalCode: '635109',
    addressCountry: 'IN',
  },
};
