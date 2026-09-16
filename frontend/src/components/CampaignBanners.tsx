import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatXof } from '../lib/currency';

interface CampaignBannersProps {
  products: Product[];
}

export const CampaignBanners: React.FC<CampaignBannersProps> = ({ products }) => {
  if (products.length === 0) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <p className="text-[11px] uppercase tracking-[0.22em] text-clay-brown mb-4">Publicités</p>
      <div className="grid md:grid-cols-2 gap-5">
        {products.slice(0, 2).map((product) => (
          <Link
            key={product.id}
            to={`/produit/${product.id}`}
            className="relative overflow-hidden rounded-3xl min-h-[180px] border border-clay-brown/10 group"
          >
            <img src={product.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative p-6 h-full flex flex-col justify-end text-white min-h-[180px]">
              <span className="text-[10px] uppercase tracking-[0.18em] text-gold-light mb-2">Offre mise en avant</span>
              <h3 className="font-serif text-2xl">{product.name}</h3>
              <p className="text-sm opacity-90 mt-1">{formatXof(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
