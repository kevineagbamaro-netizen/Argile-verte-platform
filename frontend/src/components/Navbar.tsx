import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Phone, ShoppingBag, UserRound, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { NotificationBell } from './NotificationBell';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { loginPath, telHref } from '../lib/account';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-[13px] tracking-wide transition-colors ${isActive ? 'text-clay-green font-semibold' : 'text-natural-text/75 hover:text-clay-green'}`;

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const { shop } = useShop();
  const [open, setOpen] = useState(false);
  const phone = shop.phone || '+228 90 00 00 01';

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-clay-green text-cream-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-[11px] tracking-wide">
          <p className="hidden sm:block opacity-90">{shop.navbarTagline}</p>
          <a href={telHref(phone)} className="inline-flex items-center gap-1.5 hover:opacity-80">
            <Phone className="w-3 h-3" />
            {phone}
          </a>
        </div>
      </div>

      <div className="bg-cream/95 backdrop-blur-md border-b border-clay-brown/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] flex items-center justify-between gap-6">
          <BrandMark />

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Boutique
            </NavLink>
            <a href="/#bienfaits" className="text-[13px] tracking-wide text-natural-text/75 hover:text-clay-green">
              Bienfaits
            </a>
            <a href="/#apropos" className="text-[13px] tracking-wide text-natural-text/75 hover:text-clay-green">
              Maison
            </a>
            {user?.role === 'ROLE_ADMIN' && (
              <NavLink to="/admin" className={navLinkClass}>
                Administration
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {user?.role === 'ROLE_ADMIN' && <NotificationBell />}
            {user ? (
              <div className="hidden sm:flex items-center gap-3 pr-1">
                <span className="text-[13px] text-natural-text/80 max-w-[10rem] truncate">{user.name}</span>
                <button type="button" onClick={logout} className="text-[12px] text-clay-brown hover:text-clay-green">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/connexion"
                className="hidden sm:inline-flex items-center gap-2 text-[13px] text-natural-text/80 hover:text-clay-green"
              >
                <UserRound className="w-4 h-4" />
                Compte
              </Link>
            )}

            <Link
              to={user ? '/panier' : loginPath('/panier')}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-clay-brown/15 text-clay-green hover:bg-clay-green hover:text-cream transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-5 px-1 rounded-full bg-gold text-white text-[10px] font-semibold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="md:hidden p-2 text-clay-green"
              onClick={() => setOpen((value) => !value)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-clay-brown/10 px-4 py-4 space-y-3 bg-cream">
            <Link to="/" className="block text-sm" onClick={() => setOpen(false)}>Boutique</Link>
            <a href="/#bienfaits" className="block text-sm" onClick={() => setOpen(false)}>Bienfaits</a>
            <a href="/#apropos" className="block text-sm" onClick={() => setOpen(false)}>Maison</a>
            {user ? (
              <button type="button" onClick={() => { logout(); setOpen(false); }} className="block text-sm">Déconnexion</button>
            ) : (
              <Link to="/connexion" className="block text-sm" onClick={() => setOpen(false)}>Se connecter</Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
