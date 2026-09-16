import React, { FormEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrandMark } from '../components/BrandMark';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('+228 ');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    try {
      await register({ name, email, password, phone, address });
      navigate(next && next.startsWith('/') ? next : '/');
    } catch {
      setError('Inscription impossible. Cet email est peut-être déjà utilisé.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="mb-10 flex justify-center">
        <BrandMark />
      </div>
      <div className="rounded-3xl border border-clay-brown/10 bg-cream-light p-8 shadow-[0_16px_40px_rgba(56,70,44,0.06)]">
        <h1 className="font-serif text-3xl text-clay-green mb-2">Créer un compte</h1>
        <p className="text-sm text-natural-text/60 mb-8">Choisissez un mot de passe pour commander, aimer vos produits et laisser un avis.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Nom complet</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="field" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
          </div>
          <div>
            <label className="label">Téléphone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="field" />
          </div>
          <div>
            <label className="label">Adresse</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Quartier, ville" className="field" />
          </div>
          <div>
            <label className="label">Mot de passe</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
          </div>
          <div>
            <label className="label">Confirmer le mot de passe</label>
            <input type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="field" />
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-clay-green text-cream py-3 text-sm font-medium hover:bg-clay-green-dark">
            Créer mon compte
          </button>
        </form>
        <p className="text-sm text-natural-text/70 mt-6 text-center">
          Déjà inscrit ? <Link to={next ? `/connexion?next=${encodeURIComponent(next)}` : '/connexion'} className="text-clay-green font-medium hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};
