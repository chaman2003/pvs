import Link from 'next/link';
import { SiteImage } from '@/components/ui/SiteImage';
import { createPageMetadata } from '@/lib/metadata';
import { HeroBackground } from '@/components/motion/HeroBackground';
import { HeroText } from '@/components/motion/HeroText';
import { HomeAbout } from '@/components/sections/HomeAbout';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { TestimonialsPreview } from '@/components/sections/TestimonialsPreview';
import { homeHero } from '@/content/home-sections';
import { getFeaturedProjects } from '@/lib/projects';

export const metadata = createPageMetadata({
  title: 'Buy Coco Farmland in Bangalore & Hosur | Own Farm Land',
  description:
    'Buy managed coco farmland near Bangalore and Hosur with PVS Promoters. Premium gated community farmland, clear titles, 17+ years experience, and world-class amenities since 2009.',
  path: '/',
});

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <>
      <section className="relative min-h-[70vh] max-h-[90vh] flex items-center overflow-hidden">
        <HeroBackground>
          <SiteImage
            src="/images/enhanced/green-hills-sunset-1920w.webp"
            alt="Buy coco farmland near Bangalore and Hosur — PVS Promoters managed farmland"
            fill
            critical
            className="object-cover brightness-[0.45]"
            sizes="100vw"
          />
        </HeroBackground>
        <HeroText className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 text-on-primary">
          <span className="inline-block text-secondary-container bg-primary/40 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-6 uppercase">
            {homeHero.kicker}
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-tight">
            {homeHero.headline}{' '}
            <span className="text-secondary-container">{homeHero.headlineAccent}</span>
          </h1>
          <p className="mt-6 text-lg text-on-primary/90 max-w-xl">{homeHero.description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-primary text-on-primary hover:opacity-90 transition-opacity"
            >
              {homeHero.primaryCta}
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 rounded-full bg-on-primary/10 backdrop-blur-md border border-on-primary/30 font-bold hover:bg-on-primary hover:text-primary transition-all"
            >
              {homeHero.secondaryCta}
            </Link>
          </div>
        </HeroText>
      </section>

      <HomeAbout />
      <FeaturedProjects projects={featured} />
      <TestimonialsPreview />
    </>
  );
}
