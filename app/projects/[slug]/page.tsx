import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { createPageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 60;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getProjectSlugs } = await import('@/lib/projects');
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.description.slice(0, 160),
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getAllProjects();
  const related = allProjects.filter((p) => p.id !== project.id && p.featured).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: project.title,
          description: project.description,
          url: `${siteConfig.url}/projects/${slug}`,
        }}
      />
      <ProjectDetailView project={project} related={related} />
    </>
  );
}
