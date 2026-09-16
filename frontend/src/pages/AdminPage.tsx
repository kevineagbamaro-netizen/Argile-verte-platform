import React, { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { AdminNotification, Order, Product, ProductRequest, ShopSettings } from '../types';
import { formatXof } from '../lib/currency';
import { ORDER_STATUSES, PRODUCT_CATEGORIES, statusLabel } from '../lib/togo';
import { CAMPAIGNS, SPOTLIGHTS, campaignLabel } from '../lib/campaigns';
import { DEFAULT_SHOP, mergeShop, useShop } from '../context/ShopContext';

const emptyProduct: ProductRequest = {
  name: '',
  description: '',
  price: 0,
  category: 'Cataplasmes',
  imageUrl: '',
  stock: 10,
  featured: false,
  published: false,
  campaign: 'NONE',
  spotlight: 'NONE',
  compareAtPrice: null,
};

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { refresh } = useShop();
  const [tab, setTab] = useState<'produits' | 'commandes' | 'notifications' | 'site'>('produits');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [shop, setShop] = useState<ShopSettings>(DEFAULT_SHOP);
  const [form, setForm] = useState<ProductRequest>(emptyProduct);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    const [nextProducts, nextOrders, notif, nextShop] = await Promise.all([
      api.getAdminProducts(),
      api.getAdminOrders(),
      api.getNotifications(),
      api.getShop(),
    ]);
    setProducts(nextProducts);
    setOrders(nextOrders);
    setNotifications(notif.items || []);
    setUnread(Number(notif.unread) || 0);
    setShop(mergeShop(nextShop));
  };

  useEffect(() => {
    if (user?.role === 'ROLE_ADMIN') {
      load().catch(() => setMessage('Impossible de charger l’espace admin.'));
    }
  }, [user]);

  if (!user) return <Navigate to="/connexion" replace />;
  if (user.role !== 'ROLE_ADMIN') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="font-serif text-2xl text-clay-green">Accès réservé à l’administrateur.</p>
      </div>
    );
  }

  const onSaveProduct = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        await api.updateProduct(editingId, form);
        setMessage('Produit mis à jour.');
      } else {
        await api.createProduct(form);
        setMessage('Produit enregistré. Publiez-le et choisissez sa mise en avant.');
      }
      setForm(emptyProduct);
      setEditingId(null);
      await load();
    } catch {
      setMessage('Enregistrement du produit impossible.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay-brown mb-2">Studio</p>
          <h1 className="font-serif text-4xl text-clay-green">Administration</h1>
          <p className="text-sm text-natural-text/65 mt-2">Modifiez les produits, le texte du site, les numéros et les commandes.</p>
        </div>
        <div className="flex gap-2">
          {([
            ['produits', 'Produits'],
            ['commandes', `Commandes (${orders.length})`],
            ['notifications', `Alertes${unread ? ` (${unread})` : ''}`],
            ['site', 'Site'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-full text-sm ${tab === id ? 'bg-clay-green text-cream' : 'border border-clay-brown/15 text-clay-brown'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {message && <p className="text-sm text-clay-brown">{message}</p>}

      {tab === 'produits' && (
        <div className="grid lg:grid-cols-5 gap-8">
          <form onSubmit={onSaveProduct} className="lg:col-span-2 p-6 rounded-3xl bg-cream-light border border-clay-brown/10 space-y-3">
            <h2 className="font-serif text-2xl text-clay-green">{editingId ? 'Modifier le produit' : 'Nouveau produit'}</h2>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom" className="field" />
            <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="field" />
            <input required type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Prix FCFA" className="field" />
            <input type="number" min={0} value={form.compareAtPrice ?? ''} onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value ? Number(e.target.value) : null })} placeholder="Ancien prix (liquidation)" className="field" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="field">
              {PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="URL de l’image" className="field" />
            <input type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="field" />
            <select value={form.campaign} onChange={(e) => setForm({ ...form, campaign: e.target.value })} className="field">
              {CAMPAIGNS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <select value={form.spotlight} onChange={(e) => setForm({ ...form, spotlight: e.target.value })} className="field">
              {SPOTLIGHTS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publier maintenant</label>
            <button type="submit" className="w-full rounded-full bg-clay-green text-cream py-2.5">{editingId ? 'Enregistrer les modifications' : 'Enregistrer'}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm(emptyProduct); }} className="w-full text-sm text-clay-brown">Annuler</button>
            )}
          </form>

          <div className="lg:col-span-3 space-y-3">
            <h2 className="font-serif text-2xl text-clay-green">Catalogue</h2>
            {products.map((product) => (
              <div key={product.id} className="p-4 rounded-2xl bg-cream-light border border-clay-brown/10 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-clay-green">{product.name}</p>
                    <p className="text-xs text-clay-brown mt-1">
                      {formatXof(product.price)} · {product.published ? 'Publié' : 'Brouillon'} · {campaignLabel(product.campaign) || 'Sans campagne'}
                      {product.spotlight === 'GRANDE' ? ' · Grande' : product.spotlight === 'BANNIERE' ? ' · Publicité' : ''}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(product.id);
                        setForm({
                          name: product.name,
                          description: product.description,
                          price: Number(product.price),
                          category: product.category,
                          imageUrl: product.imageUrl || '',
                          stock: product.stock,
                          featured: product.featured,
                          published: Boolean(product.published),
                          campaign: product.campaign || 'NONE',
                          spotlight: product.spotlight || 'NONE',
                          compareAtPrice: product.compareAtPrice ?? null,
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs px-3 py-1.5 rounded-full border border-clay-brown/20"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={async () => { await api.publishProduct(product.id, !product.published); await load(); }}
                      className="text-xs px-3 py-1.5 rounded-full border border-clay-brown/20"
                    >
                      {product.published ? 'Dépublier' : 'Publier'}
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={async () => { await api.setSpotlight(product.id, 'GRANDE'); await load(); }} className="text-[11px] px-3 py-1 rounded-full bg-clay-green text-cream">Mettre en grande</button>
                  <button type="button" onClick={async () => { await api.setSpotlight(product.id, 'BANNIERE'); await load(); }} className="text-[11px] px-3 py-1 rounded-full border border-clay-brown/20">Publicité</button>
                  <button type="button" onClick={async () => { await api.setCampaign(product.id, 'HIVER'); await load(); }} className="text-[11px] px-3 py-1 rounded-full border border-clay-brown/20">Hiver</button>
                  <button type="button" onClick={async () => { await api.setCampaign(product.id, 'LIQUIDATION'); await load(); }} className="text-[11px] px-3 py-1 rounded-full border border-clay-brown/20">Liquidation</button>
                  <button type="button" onClick={async () => { await api.setSpotlight(product.id, 'NONE'); await api.setCampaign(product.id, 'NONE'); await load(); }} className="text-[11px] px-3 py-1 rounded-full text-clay-brown">Retirer</button>
                  <button type="button" onClick={async () => { await api.deleteProduct(product.id); await load(); }} className="text-[11px] px-3 py-1 rounded-full text-red-700">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'commandes' && (
        <div className="overflow-x-auto rounded-3xl border border-clay-brown/10">
          <table className="min-w-full text-sm">
            <thead className="bg-cream-light text-left">
              <tr>
                <th className="p-4">N°</th>
                <th className="p-4">Client</th>
                <th className="p-4">Ville</th>
                <th className="p-4">Total</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-clay-brown/10">
                  <td className="p-4">{order.orderNumber}</td>
                  <td className="p-4">{order.customerName}<br /><span className="text-xs text-natural-text/55">{order.customerPhone}</span></td>
                  <td className="p-4">{order.city}</td>
                  <td className="p-4">{formatXof(order.totalAmount)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={async (e) => { await api.updateOrderStatus(order.id, e.target.value); await load(); }}
                      className="rounded-lg border border-clay-brown/20 px-2 py-1 bg-cream"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status.id} value={status.id}>{statusLabel(status.id)}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'site' && (
        <form
          className="max-w-3xl space-y-6 p-6 rounded-3xl bg-cream-light border border-clay-brown/10"
          onSubmit={async (event) => {
            event.preventDefault();
            setMessage('');
            try {
              const saved = await api.saveShopSettings(shop);
              setShop(mergeShop(saved));
              await refresh();
              setMessage('Le site a été mis à jour. Les visiteurs voient les nouveaux textes et numéros.');
            } catch {
              setMessage('Enregistrement impossible.');
            }
          }}
        >
          <h2 className="font-serif text-2xl text-clay-green">Tout le contenu du site</h2>
          <p className="text-sm text-natural-text/65">Modifiez ce qui s’affiche déjà : marque, accueil, bienfaits, contact et paiement.</p>

          <h3 className="font-serif text-lg text-clay-green">Maison</h3>
          <input value={shop.shopName} onChange={(e) => setShop({ ...shop, shopName: e.target.value })} placeholder="Nom" className="field" />
          <input value={shop.tagline || ''} onChange={(e) => setShop({ ...shop, tagline: e.target.value })} placeholder="Sous-titre" className="field" />
          <input value={shop.navbarTagline || ''} onChange={(e) => setShop({ ...shop, navbarTagline: e.target.value })} placeholder="Bandeau du haut" className="field" />
          <input value={shop.phone || ''} onChange={(e) => setShop({ ...shop, phone: e.target.value })} placeholder="Téléphone affiché" className="field" />
          <input value={shop.email || ''} onChange={(e) => setShop({ ...shop, email: e.target.value })} placeholder="Email" className="field" />
          <input value={shop.address || ''} onChange={(e) => setShop({ ...shop, address: e.target.value })} placeholder="Adresse" className="field" />
          <textarea value={shop.footerBlurb || ''} onChange={(e) => setShop({ ...shop, footerBlurb: e.target.value })} placeholder="Texte du pied de page" rows={3} className="field" />

          <h3 className="font-serif text-lg text-clay-green">Accueil</h3>
          <input value={shop.heroEyebrow || ''} onChange={(e) => setShop({ ...shop, heroEyebrow: e.target.value })} placeholder="Petit titre" className="field" />
          <input value={shop.heroTitle || ''} onChange={(e) => setShop({ ...shop, heroTitle: e.target.value })} placeholder="Grand titre" className="field" />
          <textarea value={shop.heroSubtitle || ''} onChange={(e) => setShop({ ...shop, heroSubtitle: e.target.value })} placeholder="Texte d’accueil" rows={3} className="field" />
          <input value={shop.heroImageUrl || ''} onChange={(e) => setShop({ ...shop, heroImageUrl: e.target.value })} placeholder="URL de la photo d’accueil" className="field" />

          <h3 className="font-serif text-lg text-clay-green">Bienfaits</h3>
          <input value={shop.bienfaitsEyebrow || ''} onChange={(e) => setShop({ ...shop, bienfaitsEyebrow: e.target.value })} placeholder="Petit titre bienfaits" className="field" />
          <input value={shop.bienfaitsTitle || ''} onChange={(e) => setShop({ ...shop, bienfaitsTitle: e.target.value })} placeholder="Titre bienfaits" className="field" />
          <textarea value={shop.bienfaitsIntro || ''} onChange={(e) => setShop({ ...shop, bienfaitsIntro: e.target.value })} placeholder="Introduction" rows={3} className="field" />
          <input value={shop.bienfait1Title || ''} onChange={(e) => setShop({ ...shop, bienfait1Title: e.target.value })} placeholder="Bienfait 1 — titre" className="field" />
          <input value={shop.bienfait1Text || ''} onChange={(e) => setShop({ ...shop, bienfait1Text: e.target.value })} placeholder="Bienfait 1 — texte" className="field" />
          <input value={shop.bienfait2Title || ''} onChange={(e) => setShop({ ...shop, bienfait2Title: e.target.value })} placeholder="Bienfait 2 — titre" className="field" />
          <input value={shop.bienfait2Text || ''} onChange={(e) => setShop({ ...shop, bienfait2Text: e.target.value })} placeholder="Bienfait 2 — texte" className="field" />
          <input value={shop.bienfait3Title || ''} onChange={(e) => setShop({ ...shop, bienfait3Title: e.target.value })} placeholder="Bienfait 3 — titre" className="field" />
          <input value={shop.bienfait3Text || ''} onChange={(e) => setShop({ ...shop, bienfait3Text: e.target.value })} placeholder="Bienfait 3 — texte" className="field" />

          <h3 className="font-serif text-lg text-clay-green">Paiement et WhatsApp</h3>
          <input required value={shop.whatsappNumber} onChange={(e) => setShop({ ...shop, whatsappNumber: e.target.value })} placeholder="WhatsApp admin" className="field" />
          <input required value={shop.floozNumber} onChange={(e) => setShop({ ...shop, floozNumber: e.target.value })} placeholder="Moov Money" className="field" />
          <input required value={shop.mixxNumber} onChange={(e) => setShop({ ...shop, mixxNumber: e.target.value })} placeholder="Mixx by Yas" className="field" />

          <button type="submit" className="w-full rounded-full bg-clay-green text-cream py-2.5">Enregistrer le site</button>
        </form>
      )}

      {tab === 'notifications' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button type="button" onClick={async () => { await api.markAllNotificationsRead(); await load(); }} className="text-sm text-clay-brown hover:underline">Tout marquer comme lu</button>
          </div>
          {notifications.length === 0 && <p className="text-sm text-natural-text/60">Aucune notification.</p>}
          {notifications.map((item) => (
            <div key={item.id} className={`p-4 rounded-2xl border ${item.read ? 'border-clay-brown/10 bg-cream-light' : 'border-clay-green/20 bg-white'}`}>
              <p className="text-xs uppercase tracking-wider text-clay-brown">{item.type}</p>
              <p className="font-medium text-clay-green mt-1">{item.title}</p>
              <p className="text-sm text-natural-text/70 mt-1">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
