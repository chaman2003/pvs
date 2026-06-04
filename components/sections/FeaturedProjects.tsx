import Link from 'next/link';
import type { IProject } from '@/lib/models/Project';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { FeaturedProjectsWarmup } from '@/components/sections/FeaturedProjectsWarmup';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';

export function FeaturedProjects({ projects }: { projects: IProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="py-20 bg-surface">
      <FeaturedProjectsWarmup projects={projects} />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead
          kicker="Popular Projects"
          title="Checkout Popular Projects"
          description="Explore our flagship coco farmland developments and availability."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        <Reveal>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors"
            >
              Explore All Projects
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
