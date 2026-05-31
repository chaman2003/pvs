'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig, navLinks } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-on-primary text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap gap-6 justify-between">
          <div className="flex gap-6">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-secondary-container transition-colors">
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-secondary-container transition-colors">
              <Mail className="h-3.5 w-3.5" />
              {siteConfig.email}
            </a>
          </div>
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            {siteConfig.addressShort}
          </span>
        </div>
      </div>

      <nav className="glass border-b border-outline-variant/20 backdrop-blur-xl bg-surface/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.jpg"
              alt="PVS Promoters"
              width={40}
              height={40}
              className="rounded-lg object-contain"
            />
            <div>
              <p className="font-headline font-bold text-primary leading-tight">{siteConfig.name}</p>
              <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-on-surface hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-primary text-on-primary px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90"
            >
              Enquire Now
            </Link>
          </div>

          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2 text-primary"
              aria-label="Menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            'lg:hidden border-t border-outline-variant/20 bg-surface px-4 pb-6',
            open ? 'block' : 'hidden'
          )}
        >
          <div className="flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-primary py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="font-semibold text-primary py-2"
            >
              Enquire Now
            </Link>
            <div className="border-t border-outline-variant/20 pt-4 mt-2 space-y-2 text-sm">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-primary font-medium py-1"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-primary font-medium py-1 break-all"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
