export function formatXof(amount: number | string): string {
  const value = typeof amount === 'string' ? Number(amount) : amount;
  if (Number.isNaN(value)) {
    return '0 FCFA';
  }
  return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value)} FCFA`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-TG', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
