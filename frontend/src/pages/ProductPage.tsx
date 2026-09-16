import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product, Review } from '../types';
import api from '../services/api';
import { formatDate, formatXof } from '../lib/currency';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { loginPath } from '../lib/account';

export const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [error, setError] = useState('');
  const [authorName, setAuthorName] = useState(user?.name ?? '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    const productId = Number(id);
    api.getProductById(productId)
      .then(setProduct)
      .catch(() => setError('Ce produit n’est pas disponible ou n’est pas encore publié.'));
    api.getReviews(productId).then(setReviews).catch(() => setReviews([]));
    api.getLikes(productId)
      .then((state) => {
        setLiked(state.liked);
        setLikeCount(state.likeCount);
      })
      .catch(() => undefined);
  }, [id]);

  useEffect(() => {
    if (user?.name) setAuthorName(user.name);
  }, [user]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="font-serif text-2xl text-clay-green mb-4">{error}</p>
        <Link to="/" className="text-clay-brown underline">Retour à la boutique</Link>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-20 text-clay-brown">Chargement du produit...</p>;
  }

  const onLike = async () => {
    if (!user) {
      navigate(loginPath(`/produit/${product.id}`));
      return;
    }
    const state = await api.toggleLike(product.id);
    setLiked(state.liked);
    setLikeCount(state.likeCount);
  };

  const onReview = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) {
      navigate(loginPath(`/produit/${product.id}`));
      return;
    }
    setMessage('');
    try {
      const created = await api.addReview(product.id, { authorName, rating, comment });
      setReviews((current) => [created, ...current]);
      setComment('');
      setMessage('Merci pour votre avis.');
    } catch {
      setMessage('Impossible d’envoyer l’avis. Vérifiez que le backend est démarré.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-3xl border border-clay-brown/15"
        />
        <div>
          <p className="text-xs uppercase tracking-widest text-clay-brown mb-2">{product.category}</p>
          <h1 className="font-serif text-4xl text-clay-green font-bold mb-4">{product.name}</h1>
          <p className="text-natural-text/80 leading-relaxed mb-6">{product.description}</p>
          <p className="font-serif text-3xl font-bold mb-4">{formatXof(product.price)}</p>
          <div className="flex items-center gap-4 mb-8 text-sm text-clay-brown">
            <span className="inline-flex items-center gap-1">
              <Star className="w-4 h-4 fill-gold text-gold" />
              {product.averageRating} / 5 · {reviews.length} avis
            </span>
            <button type="button" onClick={onLike} className="inline-flex items-center gap-1">
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              {likeCount} j’aime
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!user) {
                navigate(loginPath(`/produit/${product.id}`));
                return;
              }
              addItem(product, 1);
            }}
            disabled={product.stock <= 0}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-clay-green text-cream hover:bg-clay-green-light disabled:opacity-50"
          >
            <ShoppingBag className="w-4 h-4" />
            Ajouter au panier
          </button>
          <p className="mt-3 text-sm text-emerald-700">
            {product.stock > 0 ? `${product.stock} pièces disponibles` : 'Rupture de stock'}
          </p>
        </div>
      </div>

      <section className="mt-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-serif text-2xl text-clay-green mb-4">Avis clients</h2>
          {reviews.length === 0 ? (
            <p className="text-sm text-natural-text/70">Soyez le premier à laisser un commentaire.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="p-4 rounded-2xl bg-cream-light border border-clay-brown/15">
                  <p className="font-semibold text-clay-brown">{review.authorName}</p>
                  <p className="text-xs text-gold mb-2">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                  <p className="text-sm text-natural-text/80">{review.comment}</p>
                  <p className="text-xs text-natural-text/50 mt-2">{formatDate(review.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {user ? (
        <form onSubmit={onReview} className="p-6 rounded-2xl bg-cream-light border border-clay-brown/15 space-y-4">
          <h2 className="font-serif text-2xl text-clay-green">Laisser un commentaire</h2>
          <input
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Votre nom"
            className="w-full rounded-xl border border-clay-brown/20 px-4 py-2 bg-cream"
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-xl border border-clay-brown/20 px-4 py-2 bg-cream"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>{value} étoile{value > 1 ? 's' : ''}</option>
            ))}
          </select>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Votre avis sur ce produit..."
            rows={4}
            className="w-full rounded-xl border border-clay-brown/20 px-4 py-2 bg-cream"
          />
          <button type="submit" className="w-full rounded-full bg-clay-green text-cream py-2.5">
            Publier l’avis
          </button>
          {message && <p className="text-sm text-clay-brown">{message}</p>}
        </form>
        ) : (
          <div className="p-6 rounded-2xl bg-cream-light border border-clay-brown/15">
            <h2 className="font-serif text-2xl text-clay-green mb-3">Laisser un commentaire</h2>
            <p className="text-sm text-natural-text/70 mb-4">Connectez-vous pour aimer, commenter et commander.</p>
            <Link to={loginPath(`/produit/${product.id}`)} className="inline-flex rounded-full bg-clay-green text-cream px-5 py-2.5 text-sm">
              Se connecter
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
