import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';
import { Droplet, Sun, Activity } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-natural-text">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Catalog Section */}
      <main className="flex-grow">
        <ProductList />

        {/* Benefits Section */}
        <section id="bienfaits" className="bg-cream-light py-20 border-y border-clay-brown/15 my-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest text-clay-brown font-semibold block mb-2">
                Les Propriétés Minérales
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-clay-green font-bold mb-4">
                Pourquoi choisir notre argile verte ?
              </h2>
              <p className="text-natural-text/75 leading-relaxed">
                Utilisée depuis des millénaires pour ses vertus reminéralisantes et absorbantes,
                notre argile est sélectionnée avec rigueur pour offrir une efficacité maximale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-cream border border-clay-brown/15 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-clay-green/10 text-clay-green flex items-center justify-center mb-5">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-clay-green mb-3">
                  Détoxifiante & Absorbante
                </h3>
                <p className="text-sm text-natural-text/70 leading-relaxed">
                  Capte les impuretés, toxines et excès d'eau pour assainir les tissus en douceur.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-cream border border-clay-brown/15 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-clay-green/10 text-clay-green flex items-center justify-center mb-5">
                  <Droplet className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-clay-green mb-3">
                  Apaisante & Cicatrisante
                </h3>
                <p className="text-sm text-natural-text/70 leading-relaxed">
                  Accélère la régénération cutanée et calme les tiraillements, courbatures ou hématomes.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-cream border border-clay-brown/15 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-clay-green/10 text-clay-green flex items-center justify-center mb-5">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-clay-green mb-3">
                  100% Active & Vivante
                </h3>
                <p className="text-sm text-natural-text/70 leading-relaxed">
                  Séchée lentement au soleil méditerranéen pour préserver intacte sa richesse en oligo-éléments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
