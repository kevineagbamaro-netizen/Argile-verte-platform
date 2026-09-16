const KEY = 'argile-verte-client-key';

export function getClientKey(): string {
  const existing = localStorage.getItem(KEY);
  if (existing) {
    return existing;
  }
  const generated = `tg-${crypto.randomUUID()}`;
  localStorage.setItem(KEY, generated);
  return generated;
}
