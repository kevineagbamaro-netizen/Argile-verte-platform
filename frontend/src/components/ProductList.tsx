import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import api from '../services/api';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RefreshCw, AlertTriangle } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../lib/togo';
import { FeaturedShowcase } from './FeaturedShowcase';
import { CampaignBanners } from './CampaignBanners';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cataplasme d'Argile Verte Prêt à l'Emploi",
    description: 'Pâte d’argile verte illite 100% naturelle prête à l’emploi.',
    price: 7500,
    category: 'Cataplasmes',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    stock: 45,
    featured: true,
    averageRating: 5,
    reviewCount: 3,
    likeCount: 12,
  },
  {
    id: 2,
    name: "Poudre d'Argile Verte Ultra-Ventilée",
    description: 'Poudre d’une extrême finesse séchée au soleil.',
    price: 5000,
    category: 'Poudres',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    stock: 80,
    featured: true,
    averageRating: 5,
    reviewCount: 2,
    likeCount: 8,
  },
];

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [campaignFilter, setCampaignFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setIsOfflineMode(false);
    } catch {
      setProducts(FALLBACK_PRODUCTS);
      setIsOfflineMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['Tous', ...PRODUCT_CATEGORIES];
  const grande = products.find((product) => product.spotlight === 'GRANDE' && product.published !== false);
  const ads = products.filter((product) => product.spotlight === 'BANNIERE' || product.campaign === 'PUBLICITE').slice(0, 2);
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesCampaign = campaignFilter === 'Tous' || product.campaign === campaignFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCampaign && matchesSearch;
  });

  return (
    <>
      {!loading && grande && <FeaturedShowcase product={grande} />}
      {!loading && ads.length > 0 && <CampaignBanners products={ads} />}
    <section id="produits" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isOfflineMode && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900">Mode local : l’API n’est pas encore démarrée</p>
            <p className="text-amber-700 mt-1">
              Le catalogue de démonstration s’affiche. Lancez le backend pour likes, avis, panier et commandes réels.
            </p>
            <button
              onClick={fetchProducts}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 underline"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Réessayer
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-clay-brown font-semibold block mb-1">
            Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-clay-green font-bold">
            Nos préparations
          </h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-natural-text/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un soin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-cream-light border border-clay-brown/20 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-clay-green/30 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4">
        {['Tous', 'HIVER', 'LIQUIDATION', 'PUBLICITE'].map((item) => (
          <button
            key={item}
            onClick={() => setCampaignFilter(item)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              campaignFilter === item ? 'bg-clay-brown text-cream-light' : 'bg-cream-light text-clay-brown border border-clay-brown/15'
            }`}
          >
            {item === 'Tous' ? 'Toutes campagnes' : item === 'HIVER' ? 'Hiver' : item === 'LIQUIDATION' ? 'Liquidation' : 'Publicités'}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
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

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-clay-brown">
          <RefreshCw className="w-8 h-8 animate-spin mb-3 text-clay-green" />
          <p className="text-sm">Chargement du catalogue...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-cream-light rounded-2xl border border-clay-brown/15">
          <p className="font-serif text-xl text-clay-green mb-2">Aucun produit publié</p>
          <p className="text-sm text-natural-text/70">Modifiez la recherche ou publiez un produit depuis l’admin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
    </>
  );
};
