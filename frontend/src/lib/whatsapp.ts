import { CartItem, Order, ShopSettings } from '../types';
import { formatXof } from './currency';
import { paymentLabel } from './togo';

export function digitsForWhatsApp(phone: string): string {
  let digits = (phone || '').replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('228')) return digits;
  if (digits.startsWith('0')) return `228${digits.slice(1)}`;
  return `228${digits}`;
}

export function whatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${digitsForWhatsApp(phone)}?text=${encodeURIComponent(message)}`;
}

export function payToNumber(shop: ShopSettings | null, paymentMethod: string): string | undefined {
  if (!shop) return undefined;
  if (paymentMethod === 'FLOOZ') return shop.floozNumber;
  if (paymentMethod === 'MIXX_YAS' || paymentMethod === 'TMONEY') return shop.mixxNumber;
  return undefined;
}

type MessageLine = {
  name: string;
  quantity: number;
  lineTotal: number;
};

export function buildOrderWhatsAppMessage(input: {
  orderNumber?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  deliveryAddress: string;
  paymentMethod: string;
  walletPhone?: string;
  notes?: string;
  items: MessageLine[];
  total: number;
  payToNumber?: string;
}): string {
  const lines = [
    'Bonjour Argile Verte',
    input.orderNumber ? `Commande ${input.orderNumber}` : 'Nouvelle commande',
    '',
    `Client : ${input.customerName}`,
    `Téléphone : ${input.customerPhone}`,
    input.customerEmail ? `Email : ${input.customerEmail}` : null,
    `Ville : ${input.city}`,
    `Adresse : ${input.deliveryAddress}`,
    '',
    'Produits :',
    ...input.items.map((item) => `- ${item.name} x${item.quantity} = ${formatXof(item.lineTotal)}`),
    '',
    `Total : ${formatXof(input.total)}`,
    `Paiement : ${paymentLabel(input.paymentMethod)}`,
  ];
  if (input.payToNumber) {
    lines.push(`Numéro à créditer : ${input.payToNumber}`);
  }
  if (input.walletPhone) {
    lines.push(`Mon numéro ${paymentLabel(input.paymentMethod)} : ${input.walletPhone}`);
  }
  if (input.notes) {
    lines.push('', `Note : ${input.notes}`);
  }
  lines.push('', 'Je clique pour payer et j’attends la confirmation.');
  return lines.filter((line): line is string => line !== null).join('\n');
}

export function cartItemsToLines(items: CartItem[]): MessageLine[] {
  return items.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    lineTotal: Number(item.product.price) * item.quantity,
  }));
}

export function orderToWhatsAppMessage(order: Order, shop: ShopSettings | null): string {
  return buildOrderWhatsAppMessage({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail,
    city: order.city || '',
    deliveryAddress: order.deliveryAddress,
    paymentMethod: order.paymentMethod,
    notes: order.notes,
    items: (order.items || []).map((item) => ({
      name: item.productName,
      quantity: item.quantity,
      lineTotal: Number(item.subtotal),
    })),
    total: Number(order.totalAmount),
    payToNumber: payToNumber(shop, order.paymentMethod),
  });
}
