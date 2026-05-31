/** True when this nav href matches the current pathname. */
export function isNavLinkActive(href: string, pathname: string): boolean {
  const path = pathname.split('?')[0] || '/';
  if (href === '/') return path === '/';
  if (href === '/projects') return path === '/projects' || path.startsWith('/projects/');
  return path === href || path.startsWith(`${href}/`);
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const STATIC_PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Us',
  '/projects': 'Projects',
  '/services': 'Services',
  '/contact': 'Contact',
  '/privacy-policy': 'Privacy Policy',
};

/** Human-readable label for any public route (navbar breadcrumb). */
export function getCurrentPageLabel(pathname: string): string {
  const path = pathname.split('?')[0] || '/';

  if (STATIC_PAGE_LABELS[path]) return STATIC_PAGE_LABELS[path];

  if (path.startsWith('/projects/')) {
    const slug = path.slice('/projects/'.length);
    return `Projects — ${humanizeSlug(slug)}`;
  }

  return 'Page';
}
