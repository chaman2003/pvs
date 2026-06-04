import type { IProject } from '@/lib/models/Project';

export function ProjectTitleStrip({ project }: { project: IProject }) {
  return (
    <section className="bg-surface-container border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block bg-secondary-container text-primary px-3 py-1 rounded-full text-xs font-bold uppercase mb-2">
            {project.status}
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">
            {project.title}
          </h2>
          <p className="text-on-surface-variant mt-1">{project.location}</p>
        </div>
        {project.price && (
          <p className="font-headline text-xl md:text-2xl font-bold text-secondary shrink-0">
            {project.price}
          </p>
        )}
      </div>
    </section>
  );
}
