import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { createPageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export const metadata = createPageMetadata({
  title: 'The Emerald Estate',
  description: 'Luxury villa plots at Emerald Estate by PVS Promoters.',
  path: '/projects/emerald-estate',
});

export const revalidate = 60;

export default async function EmeraldEstatePage() {
  const project = await getProjectBySlug('emerald-estate');
  if (!project) notFound();
  const allProjects = await getAllProjects();
  const related = allProjects.filter((p) => p.id !== project.id && p.featured).slice(0, 3);
  return <ProjectDetailView project={project} related={related} />;
}
