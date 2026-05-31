'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getCurrentPageLabel } from '@/lib/nav-active';

export function CurrentPageBar() {
  const pathname = usePathname();
  if (!pathname || pathname.startsWith('/admin')) return null;

  const label = getCurrentPageLabel(pathname);
  const isHome = pathname === '/';

  return (
    <div
      className="bg-surface-container-low border-b border-outline-variant/20"
      aria-label="Current page"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center gap-2 text-sm flex-wrap">
        <span className="text-on-surface-variant shrink-0">You are here:</span>
        {isHome ? (
          <span className="font-semibold text-primary" aria-current="page">
            Home
          </span>
        ) : (
          <>
            <Link href="/" className="text-on-surface-variant hover:text-primary transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-outline shrink-0" aria-hidden />
            <span className="font-semibold text-primary truncate" aria-current="page">
              {label}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
