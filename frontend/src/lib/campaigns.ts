export const CAMPAIGNS = [
  { id: 'NONE', label: 'Aucune campagne' },
  { id: 'HIVER', label: 'Collection Hiver' },
  { id: 'LIQUIDATION', label: 'Liquidation' },
  { id: 'PUBLICITE', label: 'Publicité' },
];

export const SPOTLIGHTS = [
  { id: 'NONE', label: 'Catalogue standard' },
  { id: 'GRANDE', label: 'Grande mise en avant' },
  { id: 'BANNIERE', label: 'Bannière publicitaire' },
];

export function campaignLabel(id?: string): string {
  return CAMPAIGNS.find((item) => item.id === id)?.label ?? '';
}

export function campaignBadge(id?: string): { label: string; className: string } | null {
  if (id === 'HIVER') return { label: 'Hiver', className: 'bg-slate-800 text-white' };
  if (id === 'LIQUIDATION') return { label: 'Liquidation', className: 'bg-red-700 text-white' };
  if (id === 'PUBLICITE') return { label: 'Sélection', className: 'bg-gold text-white' };
  return null;
}
