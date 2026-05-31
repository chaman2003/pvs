import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { FaqSection } from '@/components/faq/FaqSection';
import { Reveal } from '@/components/motion/Reveal';
import { faqHighlights, faqItems } from '@/content/faq';
import { testimonials } from '@/content/testimonials';
import { siteConfig } from '@/lib/site-config';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = createPageMetadata({
  title: 'Farmland FAQ | Managed Farmland Near Bangalore',
  description:
    'FAQ on managed farmland near Bangalore, coco farmland Hosur, agricultural land Tamil Nadu, booking procedure, water source, and legal requirements.',
  path: '/faq',
});

export default function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <div className="bg-surface">
      <JsonLd data={faqJsonLd} />

      <section className="py-16 md:py-20 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionHead
            kicker="Help Center"
            title="Frequently Asked Questions"
            description="Find answers about PVS Promoters projects, bookings, site visits, documentation, and customer support."
          />
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-8">
        <Reveal>
          <FaqSection />
        </Reveal>

        <Reveal>
          <section className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/10 hover-lift">
            <h2 className="font-headline font-bold text-primary text-xl">Why Choose PVS Promoters?</h2>
            <ul className="mt-4 space-y-2 text-on-surface-variant">
              {faqHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <section className="mt-16">
          <Reveal>
            <h2 className="font-headline font-bold text-primary text-2xl text-center mb-8">
              Customer Testimonials
            </h2>
            <p className="text-center text-on-surface-variant mb-10 max-w-xl mx-auto">
              Hear from satisfied clients about their journey with {siteConfig.name}.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <blockquote className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover-lift h-full">
                  <div className="flex gap-0.5 text-secondary-container mb-3" aria-label={`${t.rating} stars`}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j}>★</span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4">
                    <p className="font-headline font-bold text-primary">{t.name}</p>
                    <p className="text-xs text-on-surface-variant">{t.role}</p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/testimonials" className="text-primary font-bold hover:text-secondary transition-colors">
              View all testimonials →
            </Link>
          </p>
        </section>

        <Reveal>
          <section className="mt-16 p-8 rounded-2xl bg-primary text-on-primary text-center">
            <h2 className="font-headline font-bold text-xl mb-3">Still have questions?</h2>
            <p className="text-on-primary/85 mb-6 max-w-lg mx-auto">
              Our team is ready to help with site visits, project details, and booking enquiries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold bg-secondary-container text-primary hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center px-8 py-3 rounded-full bg-on-primary/10 border border-on-primary/30 font-bold hover:bg-on-primary hover:text-primary transition-all"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </section>
        </Reveal>
      </section>
    </div>
  );
}
