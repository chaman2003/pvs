import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, footerLinks } from '@/lib/site-config';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-primary text-on-primary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image src="/images/logo.jpg" alt="Logo" width={48} height={48} className="rounded-lg" />
            <div>
              <p className="font-headline font-bold text-lg">{siteConfig.name}</p>
              <p className="text-secondary-container text-sm">{siteConfig.tagline}</p>
            </div>
          </div>
          <p className="text-on-primary/70 text-sm leading-relaxed">
            Premium residential and farmland projects in Hosur since {siteConfig.founded}.
          </p>
        </div>

        <div>
          <h3 className="font-headline font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-on-primary/80">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-secondary-container transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-headline font-bold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-on-primary/80">
            <li>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-secondary-container transition-colors">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-secondary-container transition-colors">
                {siteConfig.email}
              </a>
            </li>
            <li className="whitespace-pre-line leading-relaxed">{siteConfig.addressLines.join('\n')}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-headline font-bold mb-4">Newsletter</h3>
          <p className="text-sm text-on-primary/70 mb-4">Get updates on new projects and offers.</p>
          <NewsletterForm compact />
        </div>
      </div>

      <div className="border-t border-on-primary/10 py-6 text-center text-xs text-on-primary/60">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Powered by{' '}
        <Link
          href="https://www.linkedin.com/company/unity-software-solution"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold hover:text-secondary-container transition-colors"
        >
          Unity Software Solution
        </Link>
        .
      </div>
    </footer>
  );
}