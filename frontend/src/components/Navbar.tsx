import React from 'react';
import { Leaf } from 'lucide-react';
import { BackendStatusBadge } from './BackendStatusBadge';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-clay-brown/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-clay-green flex items-center justify-center text-cream shadow-sm">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-wide text-clay-green">
              Argile Verte
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-clay-brown -mt-1">
              Laboratoire Naturel
            </span>
          </div>
        </div>

        {/* Navigation & Status */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-natural-text/80">
            <a href="#produits" className="hover:text-clay-green transition-colors">
              Produits
            </a>
            <a href="#bienfaits" className="hover:text-clay-green transition-colors">
              Bienfaits
            </a>
            <a href="#apropos" className="hover:text-clay-green transition-colors">
              À Propos
            </a>
          </nav>
          <BackendStatusBadge />
        </div>
      </div>
    </header>
  );
};
