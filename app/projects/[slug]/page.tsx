import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects';
import { getProjectPageMetadata } from '@/lib/seo/project-metadata';
import { ProjectPageShell } from '@/components/projects/ProjectPageShell';

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
  return getProjectPageMetadata(project);
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectPageShell slug={slug} />;
}
