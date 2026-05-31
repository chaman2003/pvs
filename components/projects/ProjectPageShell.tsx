import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { projectJsonLd } from '@/lib/seo/project-metadata';

export async function ProjectPageShell({ slug }: { slug: string }) {
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const allProjects = await getAllProjects();
  const related = allProjects.filter((p) => p.id !== project.id && p.featured).slice(0, 3);

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <ProjectDetailView project={project} related={related} />
    </>
  );
}
