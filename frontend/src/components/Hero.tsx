import React from 'react';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-clay-green/10 text-clay-green text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pureté 100% Minérale & Biologique</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-clay-green tracking-tight leading-tight mb-6">
          Des soins naturels pour toute la famille
        </h1>

        <p className="text-lg sm:text-xl text-natural-text/80 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Riche en minéraux et oligo-éléments essentiels. Découvrez nos formules traditionnelles
          élaborées avec passion : cataplasmes prêts à l'emploi, poudres ultra-ventilées et soins spécialisés.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#produits"
            className="px-8 py-3.5 rounded-full bg-clay-green text-cream-light font-medium text-base hover:bg-clay-green-light shadow-md hover:shadow-lg transition-all"
          >
            Découvrir nos produits
          </a>
          <a
            href="#bienfaits"
            className="px-8 py-3.5 rounded-full border border-clay-brown/30 text-clay-brown font-medium text-base hover:bg-cream-dark transition-all"
          >
            En savoir plus
          </a>
        </div>

        {/* Reassurance points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-clay-brown/15 text-left">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-clay-green/10 text-clay-green">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-clay-brown">100% Naturel</h3>
              <p className="text-xs text-natural-text/70 mt-0.5">Sans additifs chimiques ni conservateurs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-clay-green/10 text-clay-green">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-clay-brown">Séchée au Soleil</h3>
              <p className="text-xs text-natural-text/70 mt-0.5">Préserve la structure cristalline et les ions actifs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-clay-green/10 text-clay-green">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-clay-brown">Savoir-faire Artisanal</h3>
              <p className="text-xs text-natural-text/70 mt-0.5">Formulations testées et éprouvées pour le bien-être.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
