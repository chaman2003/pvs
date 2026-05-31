'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingContact } from '@/components/layout/FloatingContact';
import { RouteImageWarmup } from '@/components/layout/RouteImageWarmup';

export function ConditionalSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <RouteImageWarmup />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
