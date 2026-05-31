import type { Metadata } from 'next';
import { Manrope, Work_Sans } from 'next/font/google';
import './globals.css';
import { ConditionalSiteChrome } from '@/components/layout/ConditionalSiteChrome';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationJsonLd } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Premium residential and farmland projects in Hosur, Tamil Nadu. Your lifelong realtor for plots, villas, and coco farmland.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
};

export const viewport = {
  themeColor: '#003527',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${workSans.variable} antialiased min-h-screen flex flex-col bg-background`}>
        <JsonLd
          data={[
            organizationJsonLd,
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
            },
          ]}
        />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
