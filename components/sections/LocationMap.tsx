import { siteConfig } from '@/lib/site-config';

export function LocationMap() {
  return (
    <div className="w-full">
      <div className="rounded-2xl overflow-hidden border border-outline-variant/30 h-80 md:h-96 shadow-sm">
        <iframe
          title="PVS Promoters Location"
          src={siteConfig.mapEmbedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={siteConfig.mapDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex mt-4 text-sm font-bold text-primary hover:text-secondary transition-colors"
      >
        Open in Google Maps →
      </a>
      <p className="mt-2 text-xs text-on-surface-variant">
        {siteConfig.addressLines.join(', ')}
      </p>
    </div>
  );
}
