import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/metadata';
import { getGuideBySlug, guideSlugs } from '@/content/guides';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/site-config';

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const url = `${siteConfig.url}/guides/${slug}`;

  return (
    <article className="py-16">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.description,
          datePublished: guide.publishedAt,
          author: { '@type': 'Organization', name: siteConfig.name },
          publisher: { '@type': 'Organization', name: siteConfig.name, logo: `${siteConfig.url}/images/logo.png` },
          mainEntityOfPage: url,
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        <Link href="/guides" className="text-primary font-bold text-sm hover:text-secondary">
          ← All Guides
        </Link>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mt-6">{guide.title}</h1>
        <p className="text-on-surface-variant mt-4 text-lg">{guide.description}</p>
        <div className="prose prose-neutral max-w-none mt-10 space-y-8">
          {guide.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-headline text-2xl font-bold text-primary mb-4">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-on-surface-variant leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20">
          <p className="font-headline font-bold text-primary">Ready to explore PVS projects?</p>
          <p className="text-sm text-on-surface-variant mt-2">
            View our coco farmland developments at Pathakotta and Shoolagiri.
          </p>
          <Link
            href="/projects"
            className="inline-flex mt-4 px-6 py-3 rounded-full font-bold bg-primary text-on-primary hover:opacity-90"
          >
            View Projects
          </Link>
        </div>
      </div>
    </article>
  );
}
