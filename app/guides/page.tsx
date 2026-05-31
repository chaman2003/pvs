import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import { guides } from '@/content/guides';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';

export const metadata = createPageMetadata({
  title: 'Farmland Investment Guides | Hosur & Bangalore',
  description:
    'Expert guides on buying managed farmland near Bangalore, coco farmland in Hosur, legal requirements, and location insights from PVS Promoters.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <SectionHead
          kicker="Resources"
          title="Farmland Investment Guides"
          description="Location guides, legal clarity, and buyer resources for managed farmland near Bangalore and Hosur."
        />
        <div className="space-y-6 mt-10">
          {guides.map((guide, i) => (
            <Reveal key={guide.slug} delay={i * 60}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover-lift"
              >
                <h2 className="font-headline text-xl font-bold text-primary">{guide.title}</h2>
                <p className="text-on-surface-variant mt-2 text-sm">{guide.description}</p>
                <p className="text-xs text-secondary mt-3 font-medium">Read guide →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
