import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    ignoreDuringBuilds: process.env.DOCKER_BUILD === '1',
  },
  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'pvspromoters.com' },
      { protocol: 'https', hostname: 'pvs-promoters.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/uploads/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/about_us', destination: '/about', permanent: true },
      { source: '/about_us/code.html', destination: '/about', permanent: true },
      { source: '/contact_us', destination: '/contact', permanent: true },
      { source: '/contact_us/code.html', destination: '/contact', permanent: true },
      { source: '/privacy_policy', destination: '/privacy-policy', permanent: true },
      { source: '/privacy_policy/code.html', destination: '/privacy-policy', permanent: true },
      { source: '/updated_projects_showcase', destination: '/projects', permanent: true },
      { source: '/updated_projects_showcase/code.html', destination: '/projects', permanent: true },
      { source: '/emerald_estate', destination: '/projects/emerald-estate', permanent: true },
      { source: '/emerald_estate/index.html', destination: '/projects/emerald-estate', permanent: true },
      { source: '/projects/phase1', destination: '/projects/phase-1', permanent: true },
      { source: '/projects/phase1.html', destination: '/projects/phase-1', permanent: true },
      { source: '/projects/phase2', destination: '/projects/phase-2', permanent: true },
      { source: '/projects/phase2.html', destination: '/projects/phase-2', permanent: true },
      { source: '/projects/pvc-coco-farmland', destination: '/projects', permanent: true },
      { source: '/projects/pvc-coco-farmland.html', destination: '/projects', permanent: true },
      { source: '/coco', destination: '/projects', permanent: true },
      { source: '/coco.html', destination: '/projects', permanent: true },
      { source: '/gallery', destination: '/projects', permanent: true },
      { source: '/home_page', destination: '/', permanent: true },
      { source: '/home_page/code.html', destination: '/', permanent: true },
      { source: '/projects/code.html', destination: '/projects', permanent: true },
      { source: '/services/code.html', destination: '/services', permanent: true },
      { source: '/faq/code.html', destination: '/', permanent: true },
      { source: '/testimonials', destination: '/', permanent: true },
      { source: '/faq', destination: '/', permanent: true },
      { source: '/guides', destination: '/', permanent: true },
      { source: '/guides/:slug', destination: '/', permanent: true },
      { source: '/admin.html', destination: '/admin', permanent: true },
      {
        source: '/coco-farmland-projects-pathakotta',
        destination: '/projects/phase-1',
        permanent: true,
      },
      {
        source: '/coco-farmland-projects-pathakotta-2',
        destination: '/projects/phase-2',
        permanent: true,
      },
      {
        source: '/coco-farmland-projects-shoolagiri',
        destination: '/projects/shoolagiri',
        permanent: true,
      },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/faq.html', destination: '/', permanent: true },
      { source: '/gallery.html', destination: '/projects', permanent: true },
      { source: '/testimonial-page.html', destination: '/', permanent: true },
      { source: '/policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      {
        source: '/coco-farmland-projects-Pathakotta.html',
        destination: '/projects/phase-1',
        permanent: true,
      },
      {
        source: '/coco-farmland-projects-Pathakotta-2.html',
        destination: '/projects/phase-2',
        permanent: true,
      },
      {
        source: '/coco-farmland-projects-shoolagiri.html',
        destination: '/projects/shoolagiri',
        permanent: true,
      },
      { source: '/:path*.html', destination: '/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
