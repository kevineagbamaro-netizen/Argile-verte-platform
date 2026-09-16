import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { formatXof } from '../lib/currency';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { campaignBadge } from '../lib/campaigns';
import { loginPath } from '../lib/account';
import api from '../services/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(product.likeCount ?? 0);
  const [busy, setBusy] = useState(false);
  const badge = campaignBadge(product.campaign);

  useEffect(() => {
    api.getLikes(product.id)
      .then((state) => {
        setLiked(state.liked);
        setLikeCount(state.likeCount);
      })
      .catch(() => {
        setLikeCount(product.likeCount ?? 0);
      });
  }, [product.id, product.likeCount]);

  const onLike = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      navigate(loginPath(`/produit/${product.id}`));
      return;
    }
    if (busy) return;
    setBusy(true);
    try {
      const state = await api.toggleLike(product.id);
      setLiked(state.liked);
      setLikeCount(state.likeCount);
    } catch {
      setLiked((current) => !current);
      setLikeCount((current) => current + (liked ? -1 : 1));
    } finally {
      setBusy(false);
    }
  };

  const onAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      navigate(loginPath(`/produit/${product.id}`));
      return;
    }
    addItem(product, 1);
  };

  return (
    <article className="group flex flex-col bg-cream-light rounded-2xl overflow-hidden border border-clay-brown/15 shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/produit/${product.id}`} className="relative aspect-square w-full bg-cream-dark overflow-hidden">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {badge ? (
          <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${badge.className}`}>
            {badge.label}
          </span>
        ) : product.featured ? (
          <span className="absolute top-3 left-3 bg-gold text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Coup de cœur
          </span>
        ) : null}
        <span className="absolute top-3 right-3 bg-cream/90 backdrop-blur-sm text-clay-brown text-[11px] font-medium px-2.5 py-1 rounded-full border border-clay-brown/10">
          {product.category}
        </span>
      </Link>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <Link to={`/produit/${product.id}`}>
            <h3 className="font-serif text-xl font-semibold text-clay-green group-hover:text-clay-green-light transition-colors line-clamp-2 mb-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-natural-text/75 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-clay-brown mb-4">
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              {product.averageRating ?? 5} ({product.reviewCount ?? 0} avis)
            </span>
            <button type="button" onClick={onLike} className="inline-flex items-center gap-1 hover:text-clay-green" aria-label="J'aime ce produit">
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              {likeCount}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-clay-brown/10 flex items-center justify-between gap-3">
          <span className="text-lg font-serif font-semibold text-clay-green">
            {formatXof(product.price)}
          </span>
          {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
            <span className="text-xs text-natural-text/40 line-through">{formatXof(product.compareAtPrice)}</span>
          )}
          <button
            type="button"
            onClick={onAdd}
            disabled={product.stock <= 0}
            className="inline-flex items-center gap-2 bg-clay-green text-cream px-4 py-2 rounded-xl text-sm font-medium hover:bg-clay-green-light transition-colors shadow-sm disabled:opacity-50"
          >
            <ShoppingBag className="w-4 h-4" />
            Panier
          </button>
        </div>
        <p className="mt-3 text-xs text-emerald-700">
          {product.stock > 0 ? `En stock (${product.stock})` : 'Rupture de stock'}
        </p>
      </div>
    </article>
  );
};
