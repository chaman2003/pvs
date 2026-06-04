import Link from 'next/link';
import { SiteImage } from '@/components/ui/SiteImage';
import type { SidebarThumb } from '@/content/backup-project-media';

export function MoreProjectsSidebar({ items }: { items: SidebarThumb[] }) {
  if (items.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20">
      <h4 className="font-headline font-bold text-primary text-lg mb-4">More Projects</h4>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={`${item.image}-${i}`} className="flex gap-3">
            <Link
              href={item.href}
              className="relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border border-outline-variant/20"
            >
              <SiteImage
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
                sizes="80px"
              />
            </Link>
            <div className="min-w-0">
              <h5 className="font-bold text-sm text-primary leading-snug">
                <Link href={item.href} className="hover:text-secondary transition-colors">
                  {item.label}
                </Link>
              </h5>
              <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                PVS Promoters has successfully completed a Coco Farmland project.
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
