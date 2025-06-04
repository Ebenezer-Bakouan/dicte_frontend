'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const email = localStorage.getItem('userEmail');
      if (email === 'bakouanebenezer00@gmail.com') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dictation');
      }
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Bienvenue sur Dicte</h1>
      <div className="flex gap-4">
        <Link href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Connexion
        </Link>
        <Link href="/auth/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Inscription
        </Link>
      </div>
    </main>
  );
}