import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatXof } from '../lib/currency';

export const CartPage: React.FC = () => {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-clay-brown mb-3">Panier</p>
        <h1 className="font-serif text-4xl text-clay-green mb-4">Votre sélection est vide</h1>
        <Link to="/" className="text-sm text-clay-brown hover:underline">Continuer vos achats</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <p className="text-[11px] uppercase tracking-[0.22em] text-clay-brown mb-2">Votre sélection</p>
      <h1 className="font-serif text-4xl text-clay-green mb-10">Panier</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.product.id} className="flex gap-4 p-4 rounded-2xl bg-cream-light border border-clay-brown/10">
            <img src={item.product.imageUrl} alt="" className="w-24 h-24 object-cover rounded-xl" />
            <div className="flex-1">
              <h2 className="font-serif text-lg text-clay-green">{item.product.name}</h2>
              <p className="text-sm text-clay-brown mt-0.5">{formatXof(item.product.price)}</p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={item.product.stock}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                  className="w-20 rounded-lg border border-clay-brown/15 px-2 py-1.5 bg-cream text-sm"
                />
                <button type="button" onClick={() => removeItem(item.product.id)} className="text-xs text-red-700/80 hover:underline">
                  Retirer
                </button>
              </div>
            </div>
            <p className="text-sm font-medium">{formatXof(Number(item.product.price) * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-serif text-2xl text-clay-green">Total {formatXof(total)}</p>
        <Link to="/commande" className="px-8 py-3 rounded-full bg-clay-green text-cream text-sm font-medium hover:bg-clay-green-dark">
          Passer au paiement
        </Link>
      </div>
    </div>
  );
};
