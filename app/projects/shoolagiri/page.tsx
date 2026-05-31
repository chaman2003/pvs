import { getProjectBySlug } from '@/lib/projects';
import { getProjectPageMetadata } from '@/lib/seo/project-metadata';
import { ProjectPageShell } from '@/components/projects/ProjectPageShell';

export const revalidate = 60;

export async function generateMetadata() {
  const project = await getProjectBySlug('shoolagiri');
  if (!project) return {};
  return getProjectPageMetadata(project);
}

export default function ShoolagiriPage() {
  return <ProjectPageShell slug="shoolagiri" />;
}
