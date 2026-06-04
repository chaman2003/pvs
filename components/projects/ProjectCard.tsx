import Link from 'next/link';
import type { IProject } from '@/lib/models/Project';
import { SiteImage } from '@/components/ui/SiteImage';

export function ProjectCard({ project, index = 0 }: { project: IProject; index?: number }) {
  const urgent = index < 6;

  return (
    <article className="group hover-lift">
      <Link href={`/projects/${project.id}`}>
        <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-surface-container mb-6">
          <SiteImage
            src={project.image}
            alt={`${project.title} managed farmland ${project.location} — PVS Promoters`}
            fill
            critical={urgent}
            className="object-cover hover-scale-img"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-secondary-container text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
              {project.status}
            </span>
          </div>
        </div>
        <h3 className="font-headline text-xl font-bold text-primary">{project.title}</h3>
        <p className="text-sm text-on-surface-variant mt-1">{project.location}</p>
        {project.price && (
          <p className="text-secondary font-headline font-bold mt-2">{project.price}</p>
        )}
      </Link>
    </article>
  );
}
