import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { createPageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export const metadata = createPageMetadata({
  title: 'Coco Farmland Shoolagiri',
  description: 'Farmland plots near Shoolagiri with highway connectivity.',
  path: '/projects/shoolagiri',
});

export const revalidate = 60;

export default async function ShoolagiriPage() {
  const project = await getProjectBySlug('shoolagiri');
  if (!project) notFound();
  const allProjects = await getAllProjects();
  const related = allProjects.filter((p) => p.id !== project.id && p.featured).slice(0, 3);
  return <ProjectDetailView project={project} related={related} />;
}
