import { getProjectBySlug } from '@/lib/projects';
import { getProjectPageMetadata } from '@/lib/seo/project-metadata';
import { ProjectPageShell } from '@/components/projects/ProjectPageShell';

export const revalidate = 60;

export async function generateMetadata() {
  const project = await getProjectBySlug('phase-1');
  if (!project) return {};
  return getProjectPageMetadata(project);
}

export default function Phase1Page() {
  return <ProjectPageShell slug="phase-1" />;
}
