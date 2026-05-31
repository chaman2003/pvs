import Image, { type ImageProps } from 'next/image';

export type SiteImageProps = ImageProps & {
  /** Above-the-fold: high fetch priority, no lazy load. */
  critical?: boolean;
};

/**
 * Site-wide image: always unoptimized (direct /public or /uploads URL),
 * eager by default so the browser fetches immediately.
 */
export function SiteImage({
  critical,
  priority,
  loading,
  fetchPriority,
  unoptimized = true,
  decoding = 'async',
  ...props
}: SiteImageProps) {
  const urgent = Boolean(critical ?? priority);

  return (
    <Image
      {...props}
      unoptimized={unoptimized}
      priority={urgent}
      loading={urgent ? undefined : (loading ?? 'eager')}
      fetchPriority={fetchPriority ?? (urgent ? 'high' : 'auto')}
      decoding={decoding}
    />
  );
}
