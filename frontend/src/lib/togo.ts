export const TOGO_CITIES = [
  'Lomé',
  'Agoè',
  'Tsévié',
  'Kpalimé',
  'Atakpamé',
  'Sokodé',
  'Kara',
  'Dapaong',
  'Aného',
  'Tabligbo',
  'Vogan',
  'Bassar',
];

export const PAYMENT_METHODS = [
  {
    id: 'FLOOZ',
    label: 'Moov Money',
    description: 'Paiement mobile Moov Africa',
    logo: '/payments/moov-money.png',
    needsWallet: true,
    selectedClass: 'border-[#F15A22] bg-[#FFF4EE] shadow-sm',
    logoClass: 'h-12 w-auto object-contain',
  },
  {
    id: 'MIXX_YAS',
    label: 'Mixx by Yas',
    description: 'Paiement mobile Yas',
    logo: '/payments/mixx-by-yas.png',
    needsWallet: true,
    selectedClass: 'border-[#003399] bg-[#003399] text-white shadow-sm',
    logoClass: 'h-9 w-auto object-contain rounded-md',
  },
  {
    id: 'CASH_ON_DELIVERY',
    label: 'À la livraison',
    description: 'Espèces à la réception',
    logo: null,
    logoClass: 'h-7 w-auto',
    needsWallet: false,
    selectedClass: 'border-clay-green bg-white shadow-sm ring-1 ring-clay-green/20',
  },
];

export const ORDER_STATUSES = [
  { id: 'EN_ATTENTE', label: 'En attente' },
  { id: 'CONFIRMEE', label: 'Confirmée' },
  { id: 'EXPEDIEE', label: 'Expédiée' },
  { id: 'LIVREE', label: 'Livrée' },
  { id: 'ANNULEE', label: 'Annulée' },
];

export const PRODUCT_CATEGORIES = [
  'Cataplasmes',
  'Poudres',
  'Soins Spécifiques',
  'Hygiène & Yeux',
  'Savons & Hygiène',
  'Soins Visage',
  'Soins Corps',
];

export function paymentLabel(id: string): string {
  if (id === 'TMONEY' || id === 'MIXX_YAS') return 'Mixx by Yas';
  if (id === 'FLOOZ' || id === 'MOOV_MONEY') return 'Moov Money';
  return PAYMENT_METHODS.find((method) => method.id === id)?.label ?? id;
}

export function statusLabel(id: string): string {
  return ORDER_STATUSES.find((status) => status.id === id)?.label ?? id;
}

export function needsWallet(id: string): boolean {
  return PAYMENT_METHODS.find((method) => method.id === id)?.needsWallet === true;
}
