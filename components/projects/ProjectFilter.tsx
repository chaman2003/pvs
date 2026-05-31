'use client';

import { useMemo, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import type { IProject } from '@/lib/models/Project';
import { cn } from '@/lib/utils';

const filters = ['All', 'Ongoing', 'Residential', 'Commercial', 'Farmland'] as const;

export function ProjectFilter({ projects }: { projects: IProject[] }) {
  const [active, setActive] = useState<string>('All');

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    if (active === 'Ongoing') {
      return projects.filter((p) => p.status === active);
    }
    return projects.filter((p) => p.category === active);
  }, [projects, active]);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-bold transition-all',
              active === f
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-on-surface-variant py-12">No projects match this filter.</p>
      )}
    </>
  );
}
