/** Static assets under /public — served directly, no optimizer round-trip. */
export function isDirectImageSrc(src: string): boolean {
  if (typeof src !== 'string') return false;
  return src.startsWith('/') || src.startsWith('data:');
}

/** Warm the browser cache for a list of image URLs (client-side). */
export function warmImageCache(urls: string[]): void {
  if (typeof window === 'undefined') return;
  for (const url of urls) {
    if (!url) continue;
    const img = new window.Image();
    img.decoding = 'async';
    img.src = url;
  }
}
