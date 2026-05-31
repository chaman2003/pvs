import Link from 'next/link';
import Image from 'next/image';
import { Building2, Headphones, Trees, Mail, Phone } from 'lucide-react';
import { createPageMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/forms/ContactForm';
import { ExperienceBadge } from '@/components/ui/ExperienceBadge';
import { HeroBackground } from '@/components/motion/HeroBackground';
import { HeroText } from '@/components/motion/HeroText';
import { Reveal } from '@/components/motion/Reveal';
import { testimonials } from '@/content/testimonials';
import { siteConfig } from '@/lib/site-config';

export const metadata = createPageMetadata({
  title: 'Premium Real Estate in Hosur',
  description:
    'PVS Promoters — residential layouts, commercial plots, and managed farmland near Hosur. Your lifelong realtor since 2009.',
  path: '/',
});

export const revalidate = 60;

const expertise = [
  {
    title: 'Property Development',
    desc: 'From master planning to final execution, we create sustainable urban ecosystems that thrive for generations.',
    icon: Building2,
    iconBg: 'editorial-gradient',
  },
  {
    title: 'Land Sales',
    desc: 'Curated plots in strategic locations with verified titles and immense appreciation potential for investors.',
    icon: Trees,
    iconBg: 'bg-secondary-container',
  },
  {
    title: 'Consultation',
    desc: 'Expert guidance on real estate investments, legal documentation, and property management strategies.',
    icon: Headphones,
    iconBg: 'bg-primary-container',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[70vh] max-h-[90vh] flex items-center overflow-hidden">
        <HeroBackground>
          <Image
            src="/images/enhanced/green-hills-sunset-1920w.webp"
            alt="PVS Promoters — premium farmland and residential projects at sunset"
            fill
            priority
            className="object-cover brightness-[0.45]"
            sizes="100vw"
          />
        </HeroBackground>
        <HeroText className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 text-on-primary">
          <span className="inline-block text-secondary-container bg-primary/40 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-6 uppercase">
            Premium Real Estate
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-tight">
            {siteConfig.tagline}{' '}
            <span className="text-secondary-container">{siteConfig.name}</span>
          </h1>
          <p className="mt-6 text-lg text-on-primary/90 max-w-xl">
            We create high-quality properties with expertise and professionalism, turning blueprints into legacy estates.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-primary text-on-primary hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 rounded-full bg-on-primary/10 backdrop-blur-md border border-on-primary/30 font-bold hover:bg-on-primary hover:text-primary transition-all"
            >
              View Projects
            </Link>
          </div>
        </HeroText>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/enhanced/coco-farm-clubhouse-aerial-1080w.webp"
                    alt="PVS Promoters project showcase"
                    fill
                    className="object-cover hover-scale-img"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <ExperienceBadge
                  title="17+ Years of Excellence"
                  subtitle={`Delivering trust and luxury across the landscape since ${siteConfig.founded}.`}
                  align="right"
                />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                  Crafting Spaces,
                  <br />
                  Defining Trust
                </h2>
                <p className="text-on-surface-variant mb-6 leading-relaxed">
                  At PVS Promoters, we believe real estate is more than just land and concrete. It&apos;s the foundation
                  of your future. We specialize in curating premium properties that balance modern luxury with natural
                  serenity.
                </p>
                <p className="text-on-surface-variant mb-8 leading-relaxed">
                  Our commitment to transparency and professionalism has made us a leader in the industry. Every project
                  is handled with extreme attention to detail, ensuring that our clients receive nothing but the highest
                  standard of architectural excellence.
                </p>
                <Link href="/about" className="text-primary font-bold hover:text-secondary transition-colors">
                  Learn more about us →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-primary mb-4">Core Expertise</h2>
              <div className="h-1 w-20 bg-secondary mx-auto" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map(({ title, desc, icon: Icon, iconBg }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm hover-lift border border-outline-variant/10 h-full">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${iconBg === 'editorial-gradient' ? 'editorial-gradient' : iconBg}`}
                  >
                    <Icon
                      className={`h-8 w-8 ${iconBg === 'bg-secondary-container' ? 'text-on-secondary-container' : 'text-on-primary'}`}
                    />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-4">{title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                  Connect with our
                  <br />
                  Investment Experts
                </h2>
                <p className="text-on-surface-variant mb-10 leading-relaxed">
                  Looking for the perfect property? Our team is ready to guide you through every step of your real estate
                  journey.
                </p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm border border-outline-variant/20">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-outline font-medium uppercase tracking-widest">Immediate Response</p>
                      <a href={`tel:${siteConfig.phone}`} className="text-2xl font-headline font-bold text-primary hover:text-secondary transition-colors">
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm border border-outline-variant/20">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-outline font-medium uppercase tracking-widest">Inquiries</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-xl font-headline font-bold text-primary hover:text-secondary transition-colors break-all">
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-xl border border-outline-variant/10 hover-lift">
                <ContactForm subjectDefault="Homepage Enquiry" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">What Our Clients Say</h2>
              <p className="text-on-surface-variant">
                Hear it from the buyers — testimony begins the moment you demonstrate livable truth
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 6).map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <blockquote
                  className={`relative bg-surface-container-lowest rounded-sm p-8 shadow-sm border border-outline-variant/30 hover-lift h-full ${i % 2 === 1 ? 'md:mt-5' : ''}`}
                >
                  <p className="text-on-surface italic text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 font-headline font-bold text-primary">{t.name}</footer>
                  <p className="text-xs text-secondary">{t.role}</p>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
