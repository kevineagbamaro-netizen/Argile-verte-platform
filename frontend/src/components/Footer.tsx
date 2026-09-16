import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';
import { PaymentLogos } from './PaymentLogos';
import { useShop } from '../context/ShopContext';
import { telHref } from '../lib/account';

export const Footer: React.FC = () => {
  const { shop } = useShop();
  return (
    <footer id="apropos" className="mt-24 bg-[#2C3326] text-cream-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
          <div className="md:col-span-5">
            <BrandMark inverted />
            <p className="mt-5 text-sm text-cream-light/70 max-w-sm leading-relaxed font-light">
              {shop.footerBlurb}
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold-light mb-4">Explorer</h4>
            <ul className="space-y-2.5 text-sm text-cream-light/75">
              <li><Link to="/" className="hover:text-cream">La boutique</Link></li>
              <li><a href="/#bienfaits" className="hover:text-cream">Les bienfaits</a></li>
              <li><Link to="/connexion" className="hover:text-cream">Espace client</Link></li>
              <li><Link to="/inscription" className="hover:text-cream">Créer un compte</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold-light mb-4">Nous écrire</h4>
            <ul className="space-y-3 text-sm text-cream-light/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                {shop.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold" />
                <a href={telHref(shop.phone || '')}>{shop.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold" />
                {shop.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-cream-light/50 mb-3">Paiement sécurisé</p>
            <PaymentLogos />
          </div>
          <p className="text-xs text-cream-light/45">
            © {new Date().getFullYear()} {shop.shopName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
