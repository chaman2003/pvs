'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { footerLinks } from '@/lib/site-config';
import { isNavLinkActive } from '@/lib/nav-active';
import { cn } from '@/lib/utils';

export function FooterQuickLinks() {
  const pathname = usePathname();

  return (
    <ul className="space-y-2 text-sm">
      {footerLinks.map((l) => {
        const active = isNavLinkActive(l.href, pathname);
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              className={cn(
                'inline-flex items-center gap-2 transition-colors',
                active
                  ? 'text-secondary-container font-bold'
                  : 'text-on-primary/80 hover:text-secondary-container'
              )}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-secondary-container shrink-0"
                  aria-hidden
                />
              )}
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
