import Link from 'next/link';
import { Share2, Play } from 'lucide-react';
import { SiteLogo } from '@/components/ui/SiteLogo';
import { siteConfig } from '@/lib/site-config';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { FooterQuickLinks } from '@/components/layout/FooterQuickLinks';

const socialLinks = [
  { key: 'facebook' as const, href: siteConfig.social.facebook, icon: Share2, label: 'Facebook' },
  { key: 'youtube' as const, href: siteConfig.social.youtube, icon: Play, label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-on-primary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <SiteLogo size={48} />
            <div>
              <p className="font-headline font-bold text-lg">{siteConfig.name}</p>
              <p className="text-secondary-container text-sm">{siteConfig.tagline}</p>
            </div>
          </div>
          <p className="text-on-primary/70 text-sm leading-relaxed">
            Premium coco farmland and residential projects in Hosur since {siteConfig.founded}. 240+
            projects and 11,000+ satisfied families.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {socialLinks.map(({ key, href, icon: Icon, label }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-on-primary/10 hover:bg-secondary-container hover:text-primary transition-colors text-sm"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-headline font-bold mb-4">Quick Links</h3>
          <FooterQuickLinks />
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

      <div className="border-t border-on-primary/10 px-4 sm:px-8 py-6">
        <p className="text-center text-xs text-on-primary/60">
          © 2009–{new Date().getFullYear()} {siteConfig.name}. All rights reserved. Powered by{' '}
          <Link
            href="https://www.linkedin.com/company/unity-software-solution"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-secondary-container transition-colors"
          >
            Unity Software Solution
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
