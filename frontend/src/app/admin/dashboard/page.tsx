'use client';

import React from 'react';
import AuthGuard from '../../components/AuthGuard';

export default function AdminDashboard() {
  return (
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Tableau de Bord Administrateur</h1>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userEmail');
                    window.location.href = '/auth/login';
                  }}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Statistiques */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Utilisateurs Totaux</h3>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">0</p>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Dictées Créées</h3>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">0</p>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Sessions Actives</h3>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>

            {/* Liste des utilisateurs récents */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Utilisateurs Récents</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <p className="text-sm text-gray-500">Aucun utilisateur pour le moment</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 