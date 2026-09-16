import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Order, ShopSettings } from '../types';
import api from '../services/api';
import { formatXof } from '../lib/currency';
import { paymentLabel, statusLabel } from '../lib/togo';
import { PaymentLogos } from '../components/PaymentLogos';
import { orderToWhatsAppMessage, payToNumber, whatsappUrl } from '../lib/whatsapp';

export const OrderSuccessPage: React.FC = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [shop, setShop] = useState<ShopSettings | null>(null);

  useEffect(() => {
    if (!orderNumber) return;
    api.getOrder(orderNumber).then(setOrder).catch(() => setOrder(null));
    api.getShop().then(setShop).catch(() => setShop(null));
  }, [orderNumber]);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-2xl text-clay-green mb-4">Commande introuvable</p>
        <Link to="/" className="text-sm hover:underline">Retour à la boutique</Link>
      </div>
    );
  }

  const destination = payToNumber(shop, order.paymentMethod);
  const canWhatsapp = Boolean(shop?.whatsappNumber);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-clay-brown mb-3">Confirmation</p>
      <h1 className="font-serif text-4xl text-clay-green mb-4">Merci, {order.customerName}</h1>
      <p className="text-natural-text/70 mb-8 leading-relaxed">
        Votre commande <span className="font-medium text-natural-text">{order.orderNumber}</span> est enregistrée.
        Envoyez le paiement puis écrivez à l’admin sur WhatsApp pour confirmation.
      </p>
      <div className="p-7 rounded-3xl bg-cream-light border border-clay-brown/10 space-y-3 text-sm">
        <p>Statut : {statusLabel(order.status)}</p>
        <p>Paiement : {paymentLabel(order.paymentMethod)}</p>
        <p>Adresse : {order.deliveryAddress}</p>
        <p className="font-serif text-xl text-clay-green pt-2">Total {formatXof(order.totalAmount)}</p>
        <ul className="mt-4 space-y-1 text-natural-text/75">
          {order.items?.map((item) => (
            <li key={item.id}>{item.productName} × {item.quantity} — {formatXof(item.subtotal)}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#F15A22]/30 bg-[#F15A22] p-4 text-white">
          <img src="/payments/moov-money.png" alt="Moov Money" className="h-10 w-auto object-contain mb-2" />
          <p className="mt-1 font-serif text-xl">{shop?.floozNumber || '—'}</p>
        </div>
        <div className="rounded-2xl border border-[#003399]/30 bg-[#003399] p-4 text-[#FFD100]">
          <img src="/payments/mixx-by-yas.png" alt="Mixx by Yas" className="h-8 w-auto object-contain rounded mb-2" />
          <p className="mt-1 font-serif text-xl">{shop?.mixxNumber || '—'}</p>
        </div>
      </div>
      {destination && (
        <p className="text-sm text-natural-text/70 mt-3">
          Pour cette commande, créditez {destination}.
        </p>
      )}

      {canWhatsapp && (
        <a
          href={whatsappUrl(shop!.whatsappNumber, orderToWhatsAppMessage(order, shop))}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] text-white py-3.5 text-sm font-medium"
        >
          Répondre à l’admin sur WhatsApp
        </a>
      )}

      <div className="mt-8">
        <p className="text-[10px] uppercase tracking-[0.18em] text-clay-brown mb-3">Paiement accepté</p>
        <PaymentLogos compact />
      </div>
      <Link to="/" className="inline-block mt-10 text-sm text-clay-brown hover:underline">Continuer les achats</Link>
    </div>
  );
};
