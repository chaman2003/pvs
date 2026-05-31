import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function createPageMetadata({
  title,
  description,
  path = '/',
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = ogImage ?? `${siteConfig.url}/opengraph-image`;
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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  image: `${siteConfig.url}/images/coco-farm-clubhouse-aerial.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  foundingDate: '2009',
  areaServed: ['Hosur', 'Bangalore', 'Tamil Nadu'],
  sameAs: Object.values(siteConfig.social),
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.mapCoordinates.lat,
    longitude: siteConfig.mapCoordinates.lng,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address,
    addressLocality: 'Hosur',
    addressRegion: 'Tamil Nadu',
    postalCode: '635109',
    addressCountry: 'IN',
  },
};
