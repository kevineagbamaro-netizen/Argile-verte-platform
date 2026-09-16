import React from 'react';
import { ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PaymentLogos } from './PaymentLogos';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

export const Hero: React.FC = () => {
  const { shop } = useShop();
  const { user } = useAuth();
  const title = shop.heroTitle || '';
  const [firstLine, secondLine] = title.includes(',')
    ? [title.slice(0, title.indexOf(',') + 1), title.slice(title.indexOf(',') + 1).trim()]
    : [title, ''];

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-clay-brown font-medium mb-5">
            {shop.heroEyebrow}
          </p>
          <h1 className="text-[2.6rem] sm:text-5xl md:text-[3.4rem] font-serif text-clay-green tracking-tight leading-[1.12] mb-6">
            {secondLine ? (
              <>
                {firstLine}
                <br />
                {secondLine}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-base sm:text-lg text-natural-text/75 max-w-xl leading-relaxed mb-8 font-light">
            {shop.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#produits"
              className="px-7 py-3.5 rounded-full bg-clay-green text-cream-light text-sm font-medium hover:bg-clay-green-dark shadow-sm transition-all"
            >
              Découvrir la collection
            </a>
            {!user && (
              <Link
                to="/inscription"
                className="px-7 py-3.5 rounded-full border border-clay-brown/25 text-clay-brown text-sm font-medium hover:bg-cream-dark transition-all"
              >
                Créer un compte
              </Link>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-natural-text/65">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-clay-green" /> Formules pures
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="w-4 h-4 text-clay-green" /> Livraison soignée
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-clay-green" /> Avis clients
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-clay-brown/10 shadow-[0_24px_60px_rgba(56,70,44,0.12)]">
            <img
              src={shop.heroImageUrl}
              alt={shop.shopName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 right-6 sm:left-auto sm:right-8 sm:w-64 bg-cream-light/95 backdrop-blur border border-clay-brown/10 rounded-2xl p-4 shadow-lg">
            <p className="text-[10px] uppercase tracking-[0.18em] text-clay-brown mb-2">Moyens de paiement</p>
            <PaymentLogos compact />
          </div>
        </div>
      </div>
    </section>
  );
};
