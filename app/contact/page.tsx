import { createPageMetadata } from '@/lib/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { ContactForm } from '@/components/forms/ContactForm';
import { LocationMap } from '@/components/sections/LocationMap';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/lib/site-config';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = createPageMetadata({
  title: 'Contact PVS Promoters | Farmland Hosur & Bangalore',
  description: `Contact PVS Promoters to buy farm land in Bangalore and Hosur. Call ${siteConfig.phoneDisplay}, email ${siteConfig.email}, or book a site visit.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="bg-surface">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact PVS Promoters',
          url: `${siteConfig.url}/contact`,
        }}
      />
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead title="Contact Us" description="We are here to help with your real estate journey." />
        <div className="grid lg:grid-cols-2 gap-16 mt-12">
          <Reveal>
            <div>
              <ContactForm />
            </div>
          </Reveal>
          <div className="space-y-6">
            {[
              {
                title: 'Phone',
                content: (
                  <a href={`tel:${siteConfig.phone}`} className="text-lg mt-2 block text-on-surface hover:text-primary transition-colors">
                    {siteConfig.phoneDisplay}
                  </a>
                ),
              },
              {
                title: 'Email',
                content: (
                  <a href={`mailto:${siteConfig.email}`} className="mt-2 block text-on-surface hover:text-primary transition-colors break-all">
                    {siteConfig.email}
                  </a>
                ),
              },
              {
                title: 'Address',
                content: (
                  <p className="mt-2 text-on-surface-variant whitespace-pre-line leading-relaxed">
                    {siteConfig.addressLines.join('\n')}
                  </p>
                ),
              },
            ].map(({ title, content }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover-lift">
                  <h3 className="font-headline font-bold text-primary">{title}</h3>
                  {content}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-16 w-full">
          <LocationMap />
        </Reveal>
      </section>
    </div>
  );
}
