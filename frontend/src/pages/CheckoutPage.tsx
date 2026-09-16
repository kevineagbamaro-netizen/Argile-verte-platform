import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatXof } from '../lib/currency';
import { needsWallet, PAYMENT_METHODS, TOGO_CITIES } from '../lib/togo';
import { buildOrderWhatsAppMessage, cartItemsToLines, payToNumber, whatsappUrl } from '../lib/whatsapp';
import { ShopSettings } from '../types';
import api from '../services/api';

export const CheckoutPage: React.FC = () => {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shop, setShop] = useState<ShopSettings | null>(null);
  const [customerName, setCustomerName] = useState(user?.name ?? '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone ?? '+228 ');
  const [customerEmail, setCustomerEmail] = useState(user?.email ?? '');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address ?? '');
  const [city, setCity] = useState('Lomé');
  const [paymentMethod, setPaymentMethod] = useState('FLOOZ');
  const [walletPhone, setWalletPhone] = useState(user?.phone ?? '+228 ');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getShop().then(setShop).catch(() => setShop(null));
  }, []);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-3xl text-clay-green mb-4">Votre panier est encore vide</p>
        <Link to="/" className="text-sm text-clay-brown hover:underline">Retourner à la boutique</Link>
      </div>
    );
  }

  const destination = payToNumber(shop, paymentMethod);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (!shop?.whatsappNumber) {
      setError('Le numéro WhatsApp de la boutique n’est pas encore configuré. Contactez l’administrateur.');
      return;
    }
    if (needsWallet(paymentMethod) && walletPhone.trim().length < 8) {
      setError('Indiquez votre numéro Moov Money ou Mixx by Yas.');
      return;
    }
    setSubmitting(true);
    try {
      const paymentNote = needsWallet(paymentMethod)
        ? `Portefeuille ${paymentMethod === 'FLOOZ' ? 'Moov Money' : 'Mixx by Yas'} : ${walletPhone}`
        : 'Paiement à la livraison';
      const order = await api.createOrder({
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress,
        city,
        notes: [notes, paymentNote].filter(Boolean).join(' · '),
        paymentMethod,
        totalAmount: total,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          unitPrice: Number(item.product.price),
          quantity: item.quantity,
        })),
      });
      const message = buildOrderWhatsAppMessage({
        orderNumber: order.orderNumber,
        customerName,
        customerPhone,
        customerEmail,
        city,
        deliveryAddress,
        paymentMethod,
        walletPhone: needsWallet(paymentMethod) ? walletPhone : undefined,
        notes,
        items: cartItemsToLines(items),
        total,
        payToNumber: destination,
      });
      window.open(whatsappUrl(shop.whatsappNumber, message), '_blank', 'noopener,noreferrer');
      clear();
      navigate(`/commande/${order.orderNumber}`);
    } catch (err: unknown) {
      setError(axiosMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-5 gap-12">
      <form onSubmit={onSubmit} className="lg:col-span-3 space-y-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay-brown mb-2">Finaliser</p>
          <h1 className="font-serif text-4xl text-clay-green">Votre commande</h1>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-clay-green">Livraison</h2>
          <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Nom complet" className="field" />
          <div className="grid sm:grid-cols-2 gap-3">
            <input required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Téléphone" className="field" />
            <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Email (optionnel)" className="field" />
          </div>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="field">
            {TOGO_CITIES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <textarea required value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Adresse, quartier, repère" rows={3} className="field" />
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-xl text-clay-green">Paiement</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((method) => {
              const selected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    selected ? method.selectedClass : 'border-clay-brown/15 bg-cream-light hover:border-clay-brown/30'
                  }`}
                >
                  {method.logo ? (
                    <img src={method.logo} alt={method.label} className={`${method.logoClass} mb-3`} />
                  ) : (
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-clay-green/10 text-clay-green mb-3">
                      <Banknote className="w-4 h-4" />
                    </span>
                  )}
                  <p className={`text-sm font-medium ${selected && method.id === 'MIXX_YAS' ? 'text-white' : 'text-natural-text'}`}>{method.label}</p>
                  <p className={`text-[11px] mt-0.5 ${selected && method.id === 'MIXX_YAS' ? 'text-[#FFD100]/90' : 'text-natural-text/55'}`}>{method.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[#F15A22]/30 bg-[#F15A22] p-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <img src="/payments/moov-money.png" alt="" className="h-10 w-auto object-contain" />
                <p className="text-[10px] uppercase tracking-wider font-bold text-white/85">Moov Money</p>
              </div>
              <p className="mt-1 font-serif text-xl">{shop?.floozNumber || 'Numéro à configurer'}</p>
              <p className="text-[11px] text-white/80 mt-1">Envoyez le montant sur ce numéro Moov Money.</p>
            </div>
            <div className="rounded-2xl border border-[#003399]/30 bg-[#003399] p-4 text-[#FFD100]">
              <div className="flex items-center gap-3 mb-2">
                <img src="/payments/mixx-by-yas.png" alt="" className="h-8 w-auto object-contain rounded" />
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#FFD100]/80">Mixx by Yas</p>
              </div>
              <p className="mt-1 font-serif text-xl">{shop?.mixxNumber || 'Numéro à configurer'}</p>
              <p className="text-[11px] text-white/75 mt-1">Envoyez le montant sur ce numéro Mixx.</p>
            </div>
          </div>

          {needsWallet(paymentMethod) && (
            <div className="rounded-2xl bg-cream-light border border-clay-brown/10 p-4">
              <label className="text-xs text-clay-brown block mb-2">
                Votre numéro {paymentMethod === 'FLOOZ' ? 'Moov Money' : 'Mixx by Yas'}
              </label>
              <input
                required
                value={walletPhone}
                onChange={(e) => setWalletPhone(e.target.value)}
                placeholder="+228 90 00 00 00"
                className="field bg-cream"
              />
              {destination && (
                <p className="text-[11px] text-natural-text/70 mt-2">
                  Après « Cliquez pour payer », envoyez {formatXof(total)} au {destination}, puis écrivez à l’admin sur WhatsApp.
                </p>
              )}
            </div>
          )}
        </section>

        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Indication de livraison (optionnel)" rows={2} className="field" />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full rounded-full bg-clay-green text-cream py-3.5 text-sm font-medium hover:bg-clay-green-dark disabled:opacity-60">
          {submitting ? 'Envoi…' : `Cliquez pour payer · ${formatXof(total)}`}
        </button>
        <p className="text-[11px] text-natural-text/55 text-center">
          La commande est enregistrée, puis WhatsApp s’ouvre avec le détail pour l’administrateur.
        </p>
      </form>

      <aside className="lg:col-span-2 h-fit rounded-3xl bg-cream-light border border-clay-brown/10 p-7">
        <h2 className="font-serif text-2xl text-clay-green mb-5">Récapitulatif</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.product.id} className="flex gap-3">
              <img src={item.product.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product.name}</p>
                <p className="text-xs text-natural-text/55">Qté {item.quantity}</p>
              </div>
              <p className="text-sm">{formatXof(Number(item.product.price) * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-clay-brown/10 flex items-center justify-between">
          <span className="text-sm text-natural-text/70">Total</span>
          <span className="font-serif text-2xl text-clay-green">{formatXof(total)}</span>
        </div>
      </aside>
    </div>
  );
};

function axiosMessage(err: unknown): string {
  if (typeof err === 'object' && err && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string; errors?: Record<string, string> } } }).response;
    if (response?.data?.message) return response.data.message;
    const errors = response?.data?.errors;
    if (errors) return Object.values(errors).join(' · ');
  }
  return 'Commande impossible pour le moment. Vérifiez le stock, puis réessayez.';
}
