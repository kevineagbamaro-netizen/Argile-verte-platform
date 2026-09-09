import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import api from '../services/api';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RefreshCw, AlertTriangle } from 'lucide-react';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cataplasme d'Argile Verte Prêt à l'Emploi",
    description: "Pâte d'argile verte illite 100% naturelle prête à l'emploi. Soulage les articulations et purifie la peau.",
    price: 14.50,
    category: "Cataplasmes",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    stock: 45,
    featured: true
  },
  {
    id: 2,
    name: "Poudre d'Argile Verte Ultra-Ventilée",
    description: "Poudre d'une extrême finesse séchée au soleil. Idéale pour masques de beauté et cataplasmes fins.",
    price: 9.90,
    category: "Poudres",
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
    stock: 80,
    featured: true
  },
  {
    id: 3,
    name: "Ovules d'Argile Verte Purifiée",
    description: "Soin gynécologique traditionnel naturel à l'argile verte purifiée et huiles végétales apaisantes.",
    price: 18.00,
    category: "Soins Spécifiques",
    imageUrl: "https://images.unsplash.com/photo-1608248597359-2169b9b5e56e?auto=format&fit=crop&w=600&q=80",
    stock: 25,
    featured: false
  },
  {
    id: 4,
    name: "Suppositoires Naturels à l'Argile",
    description: "Préparation douce et naturelle pour le confort intestinal et pelvien.",
    price: 16.50,
    category: "Soins Spécifiques",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    stock: 30,
    featured: false
  },
  {
    id: 5,
    name: "Collyre Douceur Argileuse",
    description: "Solution saline isotonique purifiante et apaisante pour les yeux fatigués ou irrités.",
    price: 11.20,
    category: "Hygiène & Yeux",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    stock: 35,
    featured: true
  },
  {
    id: 6,
    name: "Savon Solide à l'Argile Verte & Olive",
    description: "Savon surgras saponifié à froid, enrichi en argile verte purifiante et huile d'olive bio.",
    price: 6.50,
    category: "Savons & Hygiène",
    imageUrl: "https://images.unsplash.com/photo-1607006314644-8ff72518e154?auto=format&fit=crop&w=600&q=80",
    stock: 60,
    featured: true
  }
];

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setIsOfflineMode(false);
    } catch {
      // Si Spring Boot n'est pas encore démarré, utiliser les données locales
      setProducts(FALLBACK_PRODUCTS);
      setIsOfflineMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['Tous', 'Cataplasmes', 'Poudres', 'Soins Spécifiques', 'Hygiène & Yeux', 'Savons & Hygiène'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Tous' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="produits" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Offline Mode Banner */}
      {isOfflineMode && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900">
              Mode démonstration local actif (Backend Spring Boot en attente)
            </p>
            <p className="text-amber-700 mt-1">
              Les données ci-dessous sont actuellement chargées en mode local. Dès que votre API Spring Boot
              sera démarrée sur le port 8080 avec PostgreSQL, les données proviendront en temps réel de votre base de données.
            </p>
            <button
              onClick={fetchProducts}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 underline hover:text-amber-950"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Réessayer la connexion à Spring Boot
            </button>
          </div>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-clay-brown font-semibold block mb-1">
            Catalogue Botanique
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-clay-green font-bold">
            Nos Préparations Naturelles
          </h2>
        </div>

        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-natural-text/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un soin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-cream-light border border-clay-brown/20 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-clay-green/30 text-natural-text placeholder-natural-text/50 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <SlidersHorizontal className="w-4 h-4 text-clay-brown mr-1 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-clay-green text-cream-light shadow-sm'
                : 'bg-cream-light text-clay-brown hover:bg-cream-dark border border-clay-brown/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-clay-brown">
          <RefreshCw className="w-8 h-8 animate-spin mb-3 text-clay-green" />
          <p className="text-sm">Chargement des soins naturels depuis PostgreSQL...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-cream-light rounded-2xl border border-clay-brown/15">
          <p className="font-serif text-xl text-clay-green mb-2">Aucun produit trouvé</p>
          <p className="text-sm text-natural-text/70 mb-4">
            Essayez de modifier votre recherche ou de sélectionner une autre catégorie.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Tous');
              setSearchQuery('');
            }}
            className="text-xs uppercase tracking-wider text-clay-brown underline font-semibold"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
