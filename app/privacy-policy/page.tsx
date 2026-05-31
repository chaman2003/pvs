import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { privacyPolicyIntro, privacyPolicySections } from '@/content/privacy-policy';
import { siteConfig } from '@/lib/site-config';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.name} — how we collect, use, and protect your personal information.`,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface">
      <section className="py-16 md:py-20 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionHead
            kicker="Legal"
            title={privacyPolicyIntro.title}
            description={privacyPolicyIntro.subtitle}
          />
          <p className="text-sm text-on-surface-variant mt-2">
            Last updated: {privacyPolicyIntro.lastUpdated}
          </p>
        </div>
      </section>

      <article className="py-16 max-w-3xl mx-auto px-4 sm:px-8">
        <div className="space-y-12">
          {privacyPolicySections.map((section, i) => (
            <Reveal key={section.title} delay={i * 50}>
              <section>
              <h2 className="font-headline font-bold text-primary text-xl md:text-2xl mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-on-surface-variant leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 list-disc list-inside text-on-surface-variant">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 p-8 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover-lift">
          <h2 className="font-headline font-bold text-primary text-lg mb-3">Related Pages</h2>
          <p className="text-on-surface-variant text-sm mb-4">
            Learn more about how we work with customers and handle enquiries on our website.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-bold">
            <Link href="/contact" className="text-primary hover:text-secondary transition-colors">
              Contact Us →
            </Link>
            <Link href="/about" className="text-primary hover:text-secondary transition-colors">
              About Us →
            </Link>
          </div>
        </div>
        </Reveal>
      </article>
    </div>
  );
}
