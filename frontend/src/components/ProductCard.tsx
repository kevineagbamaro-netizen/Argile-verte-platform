import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="group flex flex-col bg-cream-light rounded-2xl overflow-hidden border border-clay-brown/15 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-cream-dark overflow-hidden">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-gold text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Coup de Cœur
          </span>
        )}
        <span className="absolute top-3 right-3 bg-cream/90 backdrop-blur-sm text-clay-brown text-[11px] font-medium px-2.5 py-1 rounded-full border border-clay-brown/10">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl font-semibold text-clay-green group-hover:text-clay-green-light transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-natural-text/75 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        <div className="pt-4 border-t border-clay-brown/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-clay-brown uppercase tracking-wider block">Prix</span>
            <span className="text-xl font-serif font-bold text-natural-text">
              {Number(product.price).toFixed(2)} €
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 bg-clay-green text-cream px-4 py-2 rounded-xl text-sm font-medium hover:bg-clay-green-light transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Commander</span>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700">
          <Check className="w-3.5 h-3.5" />
          <span>En stock ({product.stock} disponibles)</span>
        </div>
      </div>
    </article>
  );
};
