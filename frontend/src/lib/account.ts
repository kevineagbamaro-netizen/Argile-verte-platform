export function loginPath(next?: string): string {
  if (!next) return '/connexion';
  return `/connexion?next=${encodeURIComponent(next)}`;
}

export function registerPath(next?: string): string {
  if (!next) return '/inscription';
  return `/inscription?next=${encodeURIComponent(next)}`;
}

export function telHref(phone: string): string {
  return `tel:${(phone || '').replace(/\s+/g, '')}`;
}
