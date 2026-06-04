import { SiteImage } from '@/components/ui/SiteImage';

export function ProjectInnerBanner({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <section className="relative w-full min-h-[280px] md:min-h-[340px] flex items-center overflow-hidden bg-primary-container">
      <SiteImage
        src={image}
        alt={title}
        fill
        className="object-cover"
        critical
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/30" />
      <div className="relative z-[1] w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-20">
        <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-on-primary text-center drop-shadow-sm">
          {title}
        </h1>
      </div>
    </section>
  );
}
