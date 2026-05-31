import { SiteImage } from '@/components/ui/SiteImage';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteVideos } from '@/content/videos';
import { VideoModal } from '@/components/ui/VideoModal';
import { Reveal } from '@/components/motion/Reveal';

export function VideoLeadCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      <SiteImage
        src="/images/enhanced/green-hills-sunset-1080w.webp"
        alt="PVS Promoters managed farmland near Bangalore Hosur"
        fill
        className="object-cover brightness-[0.35]"
        sizes="100vw"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="text-on-primary">
              <h2 className="font-headline text-3xl md:text-4xl font-bold leading-tight">
                We Have Power Today To Change{' '}
                <span className="text-secondary-container">Tomorrow!</span>
              </h2>
              <p className="mt-4 text-on-primary/90 max-w-lg">
                Schedule a site visit to our coco farmland projects near Hosur. Experience managed
                farmland, premium amenities, and transparent documentation.
              </p>
              <div className="mt-8 max-w-md">
                <VideoModal
                  videoId={siteVideos.cta.id}
                  label={siteVideos.cta.label}
                  poster={
                    <SiteImage
                      src="/images/site-launch-aerial.png"
                      alt="PVS farmland site visit aerial view"
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                  }
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-outline-variant/10">
              <h3 className="font-headline text-xl font-bold text-primary mb-2">Visit Farmland</h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Fill in your details and our team will arrange a guided site visit.
              </p>
              <ContactForm subjectDefault="Visit Farmland Enquiry" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
