import Link from 'next/link';
import type { IProject } from '@/lib/models/Project';
import { ContactForm } from '@/components/forms/ContactForm';
import { ProjectGalleryGrid } from '@/components/projects/ProjectGalleryGrid';
import { ProjectImageWarmup } from '@/components/projects/ProjectImageWarmup';
import { ProjectUploadedVideos } from '@/components/projects/ProjectUploadedVideos';
import { ProjectVideoPosterWall } from '@/components/projects/ProjectVideoPosterWall';
import { ProjectLeadVideo } from '@/components/projects/ProjectLeadVideo';
import { ProjectInnerBanner } from '@/components/projects/ProjectInnerBanner';
import { ProjectTitleStrip } from '@/components/projects/ProjectTitleStrip';
import { MoreProjectsSidebar } from '@/components/projects/MoreProjectsSidebar';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';
import { resolveProjectPageMedia } from '@/lib/project-page-media';
import { siteConfig } from '@/lib/site-config';

function ProjectSidebar({
  project,
  sidebarThumbs,
}: {
  project: IProject;
  sidebarThumbs: { image: string; label: string; href: string }[];
}) {
  return (
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

      {sidebarThumbs.length > 0 && <MoreProjectsSidebar items={sidebarThumbs} />}

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

      <Link
        href="/projects"
        className="block text-center text-primary font-bold hover:text-secondary transition-colors"
      >
        ← All Projects
      </Link>
    </aside>
  );
}

function FeaturesBenefitsAmenitiesTimeline({ project }: { project: IProject }) {
  return (
    <>
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

      {project.videoFiles && project.videoFiles.length > 0 && (
        <div>
          <h2 className="font-headline text-xl font-bold text-primary mb-4">Uploaded Videos</h2>
          <ProjectUploadedVideos sources={project.videoFiles} title={project.title} />
        </div>
      )}
    </>
  );
}

export function ProjectDetailView({
  project,
  related = [],
}: {
  project: IProject;
  related?: IProject[];
}) {
  const media = resolveProjectPageMedia(project);
  const galleryImages = media.gallery.map((src, i) => ({
    src,
    alt: `${project.title} — photo ${i + 1}`,
  }));

  return (
    <div>
      <ProjectImageWarmup urls={media.warmupUrls} />

      <ProjectInnerBanner image={media.heroBanner} title={media.bannerTitle} />
      <ProjectTitleStrip project={project} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {media.leadVideo && (
            <Reveal>
              <ProjectLeadVideo lead={media.leadVideo} title={project.title} />
            </Reveal>
          )}

          <Reveal delay={50}>
            <div>
              <h2 className="font-headline text-2xl font-bold text-primary">Overview</h2>
              <p className="mt-4 text-on-surface-variant leading-relaxed">{project.description}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-secondary mb-1">
                Portfolio
              </p>
              <h2 className="font-headline text-xl font-bold text-primary mb-4">
                Gallery <span className="text-secondary">PVS Farmland</span>
              </h2>
              <ProjectGalleryGrid images={galleryImages} />
            </div>
          </Reveal>

          {media.videoGrid.length > 0 && (
            <Reveal delay={150}>
              <ProjectVideoPosterWall slots={media.videoGrid} title={project.title} />
            </Reveal>
          )}

          <FeaturesBenefitsAmenitiesTimeline project={project} />
        </div>

        <ProjectSidebar project={project} sidebarThumbs={media.sidebarThumbs} />
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
