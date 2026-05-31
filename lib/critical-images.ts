const GLOBAL = ['/images/logo.png'] as const;

const BY_ROUTE: Record<string, readonly string[]> = {
  '/': [
    '/images/enhanced/green-hills-sunset-1920w.webp',
    '/images/enhanced/coco-farm-clubhouse-aerial-1080w.webp',
  ],
  '/about': ['/images/enhanced/temple-river-aerial-1920w.webp'],
  '/projects': ['/images/enhanced/green-hills-sunset-1080w.webp'],
  '/services': ['/images/enhanced/green-hills-sunset-1080w.webp'],
};

export function getWarmupImages(pathname: string): string[] {
  const path = pathname.split('?')[0] || '/';
  const routeImages = BY_ROUTE[path] ?? [];

  if (path.startsWith('/projects/') && path !== '/projects') {
    return [...GLOBAL];
  }

  return [...GLOBAL, ...routeImages];
}
