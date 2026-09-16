import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

interface BrandMarkProps {
  inverted?: boolean;
  compact?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ inverted = false, compact = false }) => {
  const { shop } = useShop();
  const title = inverted ? 'text-cream-light' : 'text-clay-green';
  const subtitle = inverted ? 'text-gold-light/90' : 'text-clay-brown/80';

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className={`flex items-center justify-center rounded-full shadow-sm ${compact ? 'w-9 h-9' : 'w-11 h-11'} ${inverted ? 'bg-clay-green text-cream' : 'bg-clay-green text-cream group-hover:bg-clay-green-dark'} transition-colors`}>
        <Leaf className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
      </div>
      <div className="leading-none">
        <span className={`block font-serif font-semibold tracking-wide ${compact ? 'text-xl' : 'text-[1.65rem]'} ${title}`}>
          {shop.shopName}
        </span>
        <span className={`block mt-1 text-[10px] uppercase tracking-[0.22em] ${subtitle}`}>
          {shop.tagline}
        </span>
      </div>
    </Link>
  );
};
