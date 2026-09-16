import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ShopSettings } from '../types';
import api from '../services/api';

export const DEFAULT_SHOP: ShopSettings = {
  shopName: 'Argile Verte',
  tagline: 'Laboratoire naturel',
  navbarTagline: 'Livraison soignée à Lomé et dans tout le pays',
  phone: '+228 90 00 00 01',
  email: 'contact@argileverte.com',
  address: 'Boulevard du 13 janvier, Lomé',
  whatsappNumber: '+228 90 00 00 01',
  floozNumber: '+228 90 00 00 01',
  mixxNumber: '+228 90 00 00 01',
  heroEyebrow: 'Maison de soins naturels',
  heroTitle: 'La force minérale, pour toute la famille',
  heroSubtitle: 'Cataplasmes, poudres et soins d’exception. Commandez en ligne, suivez vos favoris, et recevez votre colis avec le soin d’une maison artisanale.',
  heroImageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
  bienfaitsEyebrow: 'Les propriétés minérales',
  bienfaitsTitle: 'Pourquoi choisir notre argile verte ?',
  bienfaitsIntro: 'Utilisée depuis des millénaires pour ses vertus reminéralisantes et absorbantes, notre argile est choisie avec rigueur, pour une efficacité douce et constante.',
  bienfait1Title: 'Détoxifiante',
  bienfait1Text: 'Capte les impuretés et assainit les tissus en douceur.',
  bienfait2Title: 'Apaisante',
  bienfait2Text: 'Calme les tiraillements, courbatures et peaux sensibles.',
  bienfait3Title: 'Séchée au soleil',
  bienfait3Text: 'Richesse en oligo-éléments préservée, sans additifs.',
  footerBlurb: 'Soins à l’argile verte, sélectionnés avec exigence. Une maison de confiance pour le bien-être de toute la famille.',
};

export function mergeShop(next: Partial<ShopSettings> | null | undefined): ShopSettings {
  const merged: ShopSettings = { ...DEFAULT_SHOP };
  if (!next) return merged;
  (Object.keys(next) as (keyof ShopSettings)[]).forEach((key) => {
    const value = next[key];
    if (value !== null && value !== undefined && String(value).trim() !== '') {
      (merged as Record<string, unknown>)[String(key)] = value;
    }
  });
  return merged;
}

interface ShopContextValue {
  shop: ShopSettings;
  refresh: () => Promise<void>;
}

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shop, setShop] = useState<ShopSettings>(DEFAULT_SHOP);

  const refresh = useCallback(async () => {
    try {
      const next = await api.getShop();
      setShop(mergeShop(next));
    } catch {
      /* keep defaults */
    }
  }, []);

  useEffect(() => {
    refresh().catch(() => undefined);
  }, [refresh]);

  const value = useMemo(() => ({ shop, refresh }), [shop, refresh]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
}
