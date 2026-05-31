import Link from 'next/link';
import Image from 'next/image';
import type { IProject } from '@/lib/models/Project';
import { Reveal } from '@/components/motion/Reveal';

export function ProjectCard({ project, index = 0 }: { project: IProject; index?: number }) {
  return (
    <Reveal delay={index * 100}>
      <article className="group hover-lift">
        <Link href={`/projects/${project.id}`}>
          <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-surface-container mb-6">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover hover-scale-img"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          <div className="absolute top-4 left-4">
            <span className="bg-secondary-container text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
              {project.status}
            </span>
          </div>
          {project.progress != null && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="h-1.5 bg-on-primary/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary-container rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <p className="text-on-primary text-xs mt-1 font-medium">{project.progress}% Complete</p>
            </div>
          )}
        </div>
        <h3 className="font-headline text-xl font-bold text-primary">{project.title}</h3>
        <p className="text-sm text-on-surface-variant mt-1">{project.location}</p>
        {project.price && (
          <p className="text-secondary font-headline font-bold mt-2">{project.price}</p>
        )}
      </Link>
    </article>
    </Reveal>
  );
}
