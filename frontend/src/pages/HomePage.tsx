import React from 'react';
import { Droplet, Sun, Activity } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ProductList } from '../components/ProductList';
import { useShop } from '../context/ShopContext';

export const HomePage: React.FC = () => {
  const { shop } = useShop();
  return (
    <>
      <Hero />
      <ProductList />
      <section id="bienfaits" className="bg-cream-light py-20 border-y border-clay-brown/15 my-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-clay-brown font-semibold block mb-2">
              {shop.bienfaitsEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-clay-green font-bold mb-4">
              {shop.bienfaitsTitle}
            </h2>
            <p className="text-natural-text/75 leading-relaxed">
              {shop.bienfaitsIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-cream border border-clay-brown/15 text-center">
              <div className="w-12 h-12 rounded-xl bg-clay-green/10 text-clay-green flex items-center justify-center mb-5 mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-clay-green mb-3">{shop.bienfait1Title}</h3>
              <p className="text-sm text-natural-text/70">{shop.bienfait1Text}</p>
            </div>
            <div className="p-8 rounded-2xl bg-cream border border-clay-brown/15 text-center">
              <div className="w-12 h-12 rounded-xl bg-clay-green/10 text-clay-green flex items-center justify-center mb-5 mx-auto">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-clay-green mb-3">{shop.bienfait2Title}</h3>
              <p className="text-sm text-natural-text/70">{shop.bienfait2Text}</p>
            </div>
            <div className="p-8 rounded-2xl bg-cream border border-clay-brown/15 text-center">
              <div className="w-12 h-12 rounded-xl bg-clay-green/10 text-clay-green flex items-center justify-center mb-5 mx-auto">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-clay-green mb-3">{shop.bienfait3Title}</h3>
              <p className="text-sm text-natural-text/70">{shop.bienfait3Text}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
