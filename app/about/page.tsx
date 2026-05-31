import Link from 'next/link';
import Image from 'next/image';
import {
  BadgeCheck,
  Eye,
  Gavel,
  Leaf,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { createPageMetadata } from '@/lib/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { ExperienceBadge } from '@/components/ui/ExperienceBadge';
import { HeroBackground } from '@/components/motion/HeroBackground';
import { HeroText } from '@/components/motion/HeroText';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/lib/site-config';

export const metadata = createPageMetadata({
  title: 'About PVS Promoters | Coco Farm Land Hosur & Bangalore',
  description:
    'About PVS Promoters — 17+ years crafting coco farmland and premium real estate near Hosur and Bangalore. 240+ projects, 11,000+ satisfied families since 2009.',
  path: '/about',
});

const standards = [
  {
    title: 'Unmatched Quality',
    description:
      'We use premium materials and rigorous quality control protocols to ensure every structure exceeds industry standards.',
    icon: BadgeCheck,
    iconBg: 'editorial-gradient',
    featured: true,
  },
  {
    title: 'Transparency',
    description:
      'Clear documentation, legal clarity, and ethical practices at every step of the transaction journey.',
    icon: Gavel,
    iconBg: 'bg-secondary-container',
  },
  {
    title: 'Innovation',
    description:
      'Integrating smart-home technologies and modern design philosophies into traditional spaces.',
    icon: Sparkles,
    iconBg: 'bg-primary-container',
  },
  {
    title: 'Sustainability',
    description:
      'Focusing on eco-friendly building techniques and energy-efficient designs.',
    icon: Leaf,
    iconBg: 'bg-secondary-container',
  },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="relative min-h-[70vh] max-h-[90vh] flex items-center overflow-hidden">
        <HeroBackground>
          <Image
            src="/images/enhanced/temple-river-aerial-1920w.webp"
            alt="PVS Promoters — premium real estate development"
            fill
            priority
            className="object-cover brightness-[0.45]"
            sizes="100vw"
          />
        </HeroBackground>
        <HeroText className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 text-on-primary w-full">
          <span className="inline-block text-secondary-container bg-primary/40 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-6 uppercase">
            Established 2008
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-tight">
            Crafting Legacies,
            <br />
            <span className="text-secondary-container">Defining Horizons.</span>
          </h1>
          <p className="mt-6 text-lg text-on-primary/90 max-w-xl">
            At PVS Promoters, we don&apos;t just build structures; we curate the spaces where life unfolds
            and dreams take root.
          </p>
        </HeroText>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative md:pb-12">
              <Reveal>
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/enhanced/amenity-hub-pool-aerial-1080w.webp"
                    alt="PVS Promoters projects and team"
                    fill
                    className="object-cover hover-scale-img"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
              <ExperienceBadge
                title="17+ Years of Excellence"
                subtitle={`Delivering trust and luxury across the landscape since ${siteConfig.founded}.`}
                align="right"
                className="mt-4 md:mt-0"
              />
            </div>
            <Reveal delay={150}>
              <div>
              <SectionHead align="left" kicker="Our Story" title="Redefining the Urban Landscape" className="mb-8" />
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                PVS Promoters emerged from a vision to redefine the urban landscape through integrity and
                architectural innovation. For over a decade, we have been at the forefront of the premium real
                estate market, delivering projects that stand as testaments to our commitment to quality.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                Our journey began with a simple belief: every square foot should serve a purpose beyond
                utility—it should inspire. Today, that belief drives our multidisciplinary team of architects,
                engineers, and visionaries.
              </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Rocket,
                title: 'Our Mission',
                text: 'To deliver exceptional living environments that harmonize modern luxury with sustainable practices and long-term value.',
                iconClass: 'editorial-gradient',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                text: 'To be the most trusted name in real estate development, setting global benchmarks for architectural excellence and customer centricity.',
                iconClass: 'bg-primary-container',
              },
            ].map(({ icon: Icon, title, text, iconClass }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border border-outline-variant/10 hover-lift h-full">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${iconClass}`}>
                    <Icon className="h-8 w-8 text-on-primary" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-4">{title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Uncompromising Standards */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHead
            kicker="The PVS Advantage"
            title="Uncompromising Standards"
            description="Every project reflects our commitment to quality, transparency, and lasting value."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map(({ title, description, icon: Icon, iconBg }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover-lift border border-outline-variant/10 h-full">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${iconBg === 'editorial-gradient' ? 'editorial-gradient' : iconBg}`}
                >
                  <Icon
                    className={`h-7 w-7 ${iconBg === 'bg-secondary-container' ? 'text-on-secondary-container' : 'text-on-primary'}`}
                  />
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-on-primary">
        <Reveal>
          <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-on-primary/85 text-lg leading-relaxed mb-10">
            With a legacy built on trust and a future defined by innovation, PVS Promoters is your partner
            in finding the perfect property.
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
