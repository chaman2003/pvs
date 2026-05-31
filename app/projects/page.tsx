import Image from 'next/image';
import { createPageMetadata } from '@/lib/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { HeroBackground } from '@/components/motion/HeroBackground';
import { HeroText } from '@/components/motion/HeroText';
import { getAllProjects } from '@/lib/projects';

export const metadata = createPageMetadata({
  title: 'Coco Farmland Projects Hosur & Bangalore | PVS Promoters',
  description:
    'Browse coco farmland projects near Hosur and Bangalore — Phase-1, Phase-2, Shoolagiri, Emerald Estate and more. Managed farmland with clear titles.',
  path: '/projects',
});

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="bg-surface">
      <section className="relative h-[40vh] min-h-[300px] max-h-[90vh] overflow-hidden">
        <HeroBackground>
          <Image
            src="/images/enhanced/coco-farm-aerial-playground-1920w.webp"
            alt="Projects"
            fill
            className="object-cover brightness-[0.45]"
            priority
            sizes="100vw"
          />
        </HeroBackground>
        <HeroText className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-on-primary">Our Projects</h1>
        </HeroText>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHead title="Explore Portfolio" description="Filter by status or category." />
        <ProjectFilter projects={projects} />
      </section>
    </div>
  );
}
