import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { formatXof } from '../lib/currency';
import { campaignBadge } from '../lib/campaigns';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { loginPath } from '../lib/account';

interface FeaturedShowcaseProps {
  product: Product;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ product }) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const badge = campaignBadge(product.campaign);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] border border-clay-brown/10 bg-cream-light">
        <Link to={`/produit/${product.id}`} className="relative min-h-[280px] md:min-h-[420px]">
          <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        </Link>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay-brown mb-3">Grande mise en avant</p>
          {badge && (
            <span className={`self-start mb-4 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${badge.className}`}>
              {badge.label}
            </span>
          )}
          <h2 className="font-serif text-3xl md:text-4xl text-clay-green mb-4">{product.name}</h2>
          <p className="text-sm text-natural-text/70 leading-relaxed mb-6">{product.description}</p>
          <div className="flex items-end gap-3 mb-6">
            {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
              <span className="text-sm text-natural-text/40 line-through">{formatXof(product.compareAtPrice)}</span>
            )}
            <span className="font-serif text-3xl text-clay-green">{formatXof(product.price)}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  navigate(loginPath(`/produit/${product.id}`));
                  return;
                }
                addItem(product, 1);
              }}
              className="px-6 py-3 rounded-full bg-clay-green text-cream text-sm hover:bg-clay-green-dark"
            >
              Ajouter au panier
            </button>
            <Link to={`/produit/${product.id}`} className="px-6 py-3 rounded-full border border-clay-brown/20 text-sm text-clay-brown">
              Voir le soin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
