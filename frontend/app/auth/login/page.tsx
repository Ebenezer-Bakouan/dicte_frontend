'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthState } from '@/hooks/useAuthState';
import { FaUserCircle } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setAuth } = useAuthState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://dicte-backend.onrender.com/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion');
      }

      setAuth(data.user, data.token);
      if (data.user.email === 'bakouanebenezer00@gmail.com') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dictation');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-400">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 sm:p-10 backdrop-blur-md animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-indigo-500 text-6xl mb-2 drop-shadow-lg animate-bounce" />
          <h1 className="text-3xl font-extrabold text-gray-900">Connexion</h1>
          <p className="mt-2 text-sm text-gray-600">Bienvenue sur Dicte, votre plateforme d'apprentissage</p>
        </div>
        {error && (
          <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg border border-red-200 text-center animate-shake">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-white/80"
              placeholder="votre@email.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-white/80"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-md"
          >
            Se connecter
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 