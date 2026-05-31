'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { CurrentPageBar } from '@/components/layout/CurrentPageBar';
import { Footer } from '@/components/layout/Footer';
import { FloatingContact } from '@/components/layout/FloatingContact';
import { BackToTop } from '@/components/ui/BackToTop';

export function ConditionalSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <CurrentPageBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
      <BackToTop />
    </>
  );
}
