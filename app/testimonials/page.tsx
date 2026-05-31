import { createPageMetadata } from '@/lib/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { testimonials } from '@/content/testimonials';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/site-config';

export const metadata = createPageMetadata({
  title: 'Customer Reviews | PVS Promoters Farmland',
  description:
    'Read customer reviews and testimonials from PVS Promoters farmland buyers. 6000+ happy customers and 11,000+ satisfied families since 2009.',
  path: '/testimonials',
});

export default function TestimonialsPage() {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(testimonials.length),
      bestRating: '5',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(t.rating), bestRating: '5' },
      reviewBody: t.quote,
    })),
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      <JsonLd data={reviewSchema} />
      <SectionHead kicker="Reviews" title="Client Testimonials" description="Trusted by thousands of families across South India." />
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <blockquote className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover-lift h-full">
              <div className="flex gap-1 text-secondary mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="text-on-surface-variant text-lg italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-headline font-bold text-primary">{t.name}</p>
                <p className="text-sm text-secondary">{t.role}</p>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
