import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PVS Promoters',
    short_name: 'PVS',
    description: 'Your Lifelong Realtor — Premium plots and farmland in Hosur',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f9fb',
    theme_color: '#003527',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/jpeg',
      },
    ],
  };
}
