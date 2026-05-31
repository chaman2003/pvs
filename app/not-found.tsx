import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = {
  ...createPageMetadata({
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found on PVS Promoters.',
    path: '/404',
  }),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-headline text-6xl font-bold text-primary">404</h1>
      <p className="text-on-surface-variant mt-4 text-lg">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex px-8 py-4 rounded-full font-bold bg-primary text-on-primary hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
