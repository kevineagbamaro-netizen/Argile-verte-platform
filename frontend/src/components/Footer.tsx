import React from 'react';
import { Leaf, Mail, Shield, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-clay-brown text-cream-light mt-20 border-t border-clay-brown-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-clay-green flex items-center justify-center text-cream">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide">
                Argile Verte
              </span>
            </div>
            <p className="text-sm text-cream-light/80 max-w-md leading-relaxed mb-6 font-light">
              Des soins naturels, respectueux de votre corps et de l’environnement. 
              Extraite au cœur de gisements préservés et séchée naturellement au soleil.
            </p>
            <div className="flex items-center gap-4 text-xs text-cream-light/70">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-gold" /> Qualité Contrôlée
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold" /> Écologique & Éthique
              </span>
            </div>
          </div>

          {/* Gammes */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4 text-gold-light">
              Nos Gammes
            </h4>
            <ul className="space-y-2 text-sm text-cream-light/80">
              <li><a href="#produits" className="hover:text-cream transition-colors">Cataplasmes</a></li>
              <li><a href="#produits" className="hover:text-cream transition-colors">Poudres ventilées</a></li>
              <li><a href="#produits" className="hover:text-cream transition-colors">Soins gynécologiques</a></li>
              <li><a href="#produits" className="hover:text-cream transition-colors">Hygiène oculaire & soins</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4 text-gold-light">
              Contact & Renseignements
            </h4>
            <ul className="space-y-3 text-sm text-cream-light/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>contact@argileverte.com</span>
              </li>
              <li className="text-xs text-cream-light/60 mt-3">
                Architecture Fullstack : Spring Boot 3 + React + PostgreSQL
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream-light/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-light/60">
          <p>© {new Date().getFullYear()} Argile Verte. Tous droits réservés.</p>
          <p>Développé avec React, Spring Boot & PostgreSQL.</p>
        </div>
      </div>
    </footer>
  );
};
