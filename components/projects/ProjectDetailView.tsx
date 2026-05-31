import Image from 'next/image';
import Link from 'next/link';
import type { IProject } from '@/lib/models/Project';
import { ContactForm } from '@/components/forms/ContactForm';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectVideoGrid } from '@/components/projects/ProjectVideoGrid';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SectionHead } from '@/components/ui/SectionHead';
import { HeroBackground } from '@/components/motion/HeroBackground';
import { HeroText } from '@/components/motion/HeroText';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/lib/site-config';

export function ProjectDetailView({
  project,
  related = [],
}: {
  project: IProject;
  related?: IProject[];
}) {
  const galleryImages = (project.gallery?.length ? project.gallery : [project.image]).map(
    (src, i) => ({
      src,
      alt: `${project.title} — photo ${i + 1}`,
    })
  );

  return (
    <div>
      <section className="relative min-h-[50vh] max-h-[90vh] flex items-center overflow-hidden">
        <HeroBackground>
          <Image
            src={project.image}
            alt={`${project.title} managed farmland ${project.location} — PVS Promoters hero`}
            fill
            className="object-cover brightness-[0.5] hover-scale-img"
            priority
            sizes="100vw"
          />
        </HeroBackground>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 to-transparent z-[1]">
          <HeroText className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 text-on-primary w-full">
            <span className="bg-secondary-container text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
              {project.status}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">{project.title}</h1>
            <p className="text-on-primary/80 mt-2">{project.location}</p>
            {project.price && (
              <p className="text-secondary-container font-bold text-xl mt-2">{project.price}</p>
            )}
          </HeroText>
        </div>
      </section>

      {(project.progress != null || project.goal) && (
        <section className="bg-primary-container text-on-primary py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.progress != null && (
              <div className="text-center">
                <p className="font-headline text-3xl md:text-4xl font-bold text-secondary-container">
                  {project.progress}%
                </p>
                <p className="text-sm text-on-primary/80 mt-1">Development Progress</p>
              </div>
            )}
            {project.goal && (
              <div className="text-center">
                <p className="font-headline text-3xl md:text-4xl font-bold text-secondary-container">
                  {project.goal.value}
                </p>
                <p className="text-sm text-on-primary/80 mt-1">{project.goal.label}</p>
              </div>
            )}
            {project.details?.area && (
              <div className="text-center">
                <p className="font-headline text-2xl md:text-3xl font-bold text-secondary-container">
                  {project.details.area}
                </p>
                <p className="text-sm text-on-primary/80 mt-1">Plot Sizes</p>
              </div>
            )}
            {project.details?.units && (
              <div className="text-center">
                <p className="font-headline text-2xl md:text-3xl font-bold text-secondary-container">
                  {project.details.units}
                </p>
                <p className="text-sm text-on-primary/80 mt-1">Availability</p>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <Reveal>
            <div>
              <h2 className="font-headline text-2xl font-bold text-primary">Overview</h2>
              <p className="mt-4 text-on-surface-variant leading-relaxed">{project.description}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <h2 className="font-headline text-xl font-bold text-primary mb-4">Project Gallery</h2>
              <ProjectGallery images={galleryImages} />
            </div>
          </Reveal>

          {project.features?.length > 0 && (
            <div>
              <h2 className="font-headline text-xl font-bold text-primary">Features</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-on-surface-variant">
                    <span className="text-secondary font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.benefits && project.benefits.length > 0 && (
            <div>
              <h2 className="font-headline text-xl font-bold text-primary">Benefits</h2>
              <ul className="mt-4 space-y-2">
                {project.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-on-surface-variant">
                    <span className="text-secondary-container font-bold mt-0.5">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.amenities && project.amenities.length > 0 && (
            <div>
              <h2 className="font-headline text-xl font-bold text-primary">Amenities</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant text-sm font-medium border border-outline-variant/30"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.videos?.length || project.videoFiles?.length || project.youtubeId) && (
            <div className="space-y-6">
              <h2 className="font-headline text-xl font-bold text-primary">Project Videos</h2>
              <ProjectVideoGrid
                videos={[
                  ...(project.videos?.length
                    ? project.videos
                    : project.youtubeId
                      ? [project.youtubeId]
                      : []),
                  ...(project.videoFiles || []),
                ]}
                title={project.title}
              />
            </div>
          )}

          {project.timeline && (
            <div>
              <h2 className="font-headline text-xl font-bold text-primary">Project Timeline</h2>
              <div className="mt-4 p-6 rounded-2xl bg-surface-container border border-outline-variant/20">
                <p className="text-sm text-on-surface-variant">
                  <strong className="text-primary">Start:</strong> {project.timeline.start}
                </p>
                <p className="text-sm text-on-surface-variant mt-2">
                  <strong className="text-primary">Expected completion:</strong>{' '}
                  {project.timeline.completion}
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <Reveal delay={150}>
            <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 sticky top-24 hover-lift">
            <h3 className="font-headline font-bold text-primary text-lg">Book Now</h3>
            <p className="text-sm text-on-surface-variant mt-2 mb-4">
              Schedule a site visit or request a callback from our team.
            </p>
            <ContactForm subjectDefault={`Enquiry: ${project.title}`} />
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-4 block w-full text-center bg-secondary-container text-primary py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              Call {siteConfig.phoneDisplay}
            </a>
            </div>
          </Reveal>

          {project.details && (
            <div className="p-6 rounded-2xl bg-surface-container-low text-sm space-y-3 border border-outline-variant/20">
              {project.details.area && (
                <p>
                  <strong className="text-primary">Area:</strong> {project.details.area}
                </p>
              )}
              {project.details.units && (
                <p>
                  <strong className="text-primary">Units:</strong> {project.details.units}
                </p>
              )}
              {project.details.rera && (
                <p>
                  <strong className="text-primary">RERA:</strong> {project.details.rera}
                </p>
              )}
            </div>
          )}

          {project.progress != null && (
            <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20">
              <p className="text-sm font-bold text-primary">Progress</p>
              <div className="h-2 bg-outline-variant/30 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-secondary-container rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <p className="text-xs mt-1 text-on-surface-variant">{project.progress}% complete</p>
            </div>
          )}

          <Link
            href="/projects"
            className="block text-center text-primary font-bold hover:text-secondary transition-colors"
          >
            ← All Projects
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="py-16 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <SectionHead title="Related Projects" />
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
