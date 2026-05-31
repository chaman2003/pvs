export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
