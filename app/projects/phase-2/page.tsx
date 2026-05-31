import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { createPageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export const metadata = createPageMetadata({
  title: 'PVS Coco Farmland Phase-2',
  description: 'Phase 2 coco farmland at Pathakotta with upgraded amenities.',
  path: '/projects/phase-2',
});

export const revalidate = 60;

export default async function Phase2Page() {
  const project = await getProjectBySlug('phase-2');
  if (!project) notFound();
  const allProjects = await getAllProjects();
  const related = allProjects.filter((p) => p.id !== project.id && p.featured).slice(0, 3);
  return <ProjectDetailView project={project} related={related} />;
}
