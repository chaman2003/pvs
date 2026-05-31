import Link from 'next/link';
import Image from 'next/image';
import {
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  TrendingUp,
  Trees,
  Users,
} from 'lucide-react';
import { createPageMetadata } from '@/lib/metadata';
import { ExperienceBadge } from '@/components/ui/ExperienceBadge';
import { HeroBackground } from '@/components/motion/HeroBackground';
import { HeroText } from '@/components/motion/HeroText';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/lib/site-config';

export const metadata = createPageMetadata({
  title: 'Services',
  description:
    'Expert real estate services by PVS Promoters — property development, land sales, and consultation in Hosur and Tamil Nadu.',
  path: '/services',
});

const developmentFeatures = [
  'Site Feasibility & Planning',
  'Sustainable Urban Design',
  'Project Lifecycle Management',
] as const;

const consultationFeatures = [
  { label: 'Market Analysis', sub: 'Real-time Data' },
  { label: 'Investment', sub: 'Portfolio Growth' },
] as const;

export default function ServicesPage() {
  return (
    <div className="bg-surface">
      <section className="relative min-h-[60vh] max-h-[90vh] flex items-center overflow-hidden">
        <HeroBackground>
          <Image
            src="/images/enhanced/site-earthworks-retaining-wall-1920w.webp"
            alt="Expert real estate services by PVS Promoters"
            fill
            priority
            className="object-cover brightness-[0.45]"
            sizes="100vw"
          />
        </HeroBackground>
        <HeroText className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 text-on-primary w-full">
          <span className="inline-block text-secondary-container bg-primary/40 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-6 uppercase">
            Our Expertise
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-tight">
            Expert Real Estate
            <br />
            <span className="text-secondary-container">Services</span>
          </h1>
          <p className="mt-6 text-lg text-on-primary/90 max-w-xl">
            Crafting enduring value through strategic land development, curated sales, and visionary
            consultation for modern living.
          </p>
        </HeroText>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <div className="w-16 h-16 rounded-full editorial-gradient flex items-center justify-center mb-8">
                  <Building2 className="h-8 w-8 text-on-primary" />
                </div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6">
                  Property Development
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  From conceptual site planning to final construction, we transform raw landscapes into
                  thriving communities. Our approach integrates sustainable design with premium aesthetics,
                  ensuring every development stands as a testament to architectural excellence.
                </p>
                <ul className="space-y-4 mb-10">
                  {developmentFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-on-surface-variant">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-primary text-on-primary hover:opacity-90 transition-opacity"
                >
                  Enquire Now
                </Link>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/enhanced/coco-farm-clubhouse-aerial-1080w.webp"
                    alt="Property development by PVS Promoters"
                    fill
                    className="object-cover hover-scale-img"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <ExperienceBadge
                  title="17+"
                  subtitle="Years of Development Excellence"
                  align="left"
                  centered
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl lg:order-1">
                <Image
                  src="/images/enhanced/paddy-fields-aerial-1080w.webp"
                  alt="Premium land sales by PVS Promoters"
                  fill
                  className="object-cover hover-scale-img"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal delay={150} className="lg:order-2">
              <div>
                <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-8">
                  <Trees className="h-8 w-8 text-on-secondary-container" />
                </div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6">Land Sales</h2>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  Secure your future with prime land holdings. We curate a selection of premium residential and
                  commercial plots, verified for legal clarity and high-appreciation potential. Our transparent
                  process ensures a seamless acquisition experience.
                </p>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 mb-10 flex gap-4 hover-lift">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <BadgeCheck className="h-6 w-6 text-on-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-primary mb-1">Verified Ownership</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Clear titles and 100% legal documentation for peace of mind.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-primary text-on-primary hover:opacity-90 transition-opacity"
                >
                  Enquire Now
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mb-8">
                  <Users className="h-8 w-8 text-on-primary" />
                </div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6">
                  Real Estate Consultation
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  Navigate the complex property market with expert guidance. Whether you are an investor looking
                  for high-yield assets or a homeowner seeking a legacy property, our consultants provide
                  data-driven insights tailored to your goals.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {consultationFeatures.map(({ label, sub }, i) => (
                    <div
                      key={label}
                      className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 hover-lift"
                    >
                      <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center mb-3">
                        {i === 0 ? (
                          <BarChart3 className="h-5 w-5 text-primary" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <p className="font-headline font-bold text-primary">{label}</p>
                      <p className="text-sm text-on-surface-variant mt-1">{sub}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-primary text-on-primary hover:opacity-90 transition-opacity"
                >
                  Enquire Now
                </Link>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/enhanced/plot-division-top-down-1080w.webp"
                  alt="Real estate consultation by PVS Promoters"
                  fill
                  className="object-cover hover-scale-img"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-on-primary">
        <Reveal>
          <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
            <p className="text-on-primary/85 text-lg leading-relaxed mb-8">
              Ready to explore premium properties across Hosur and Tamil Nadu? {siteConfig.name} is here to
              guide you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-secondary-container text-primary hover:opacity-90 transition-opacity"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-full bg-on-primary/10 backdrop-blur-md border border-on-primary/30 font-bold hover:bg-on-primary hover:text-primary transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
