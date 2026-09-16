import React, { FormEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrandMark } from '../components/BrandMark';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate(next && next.startsWith('/') ? next : '/');
      }
    } catch {
      setError('Identifiants incorrects. Vérifiez votre email et votre mot de passe.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="mb-10 flex justify-center">
        <BrandMark />
      </div>
      <div className="rounded-3xl border border-clay-brown/10 bg-cream-light p-8 shadow-[0_16px_40px_rgba(56,70,44,0.06)]">
        <h1 className="font-serif text-3xl text-clay-green mb-2">Connexion</h1>
        <p className="text-sm text-natural-text/60 mb-8">Accédez à votre espace pour commander et suivre vos soins.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" autoComplete="email" />
          </div>
          <div>
            <label className="label">Mot de passe</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="field" autoComplete="current-password" />
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-clay-green text-cream py-3 text-sm font-medium hover:bg-clay-green-dark">
            Se connecter
          </button>
        </form>
        <p className="text-sm text-natural-text/70 mt-6 text-center">
          Nouveau client ? <Link to={next ? `/inscription?next=${encodeURIComponent(next)}` : '/inscription'} className="text-clay-green font-medium hover:underline">Créer un mot de passe</Link>
        </p>
      </div>
    </div>
  );
};
