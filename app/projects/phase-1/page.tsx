import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { createPageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export const metadata = createPageMetadata({
  title: 'PVS Coco Farmland Phase-1',
  description: 'Premium coco farmland plots at Pathakotta, Hosur — Phase 1 by PVS Promoters.',
  path: '/projects/phase-1',
});

export const revalidate = 60;

export default async function Phase1Page() {
  const project = await getProjectBySlug('phase-1');
  if (!project) notFound();
  const allProjects = await getAllProjects();
  const related = allProjects.filter((p) => p.id !== project.id && p.featured).slice(0, 3);
  return <ProjectDetailView project={project} related={related} />;
}
