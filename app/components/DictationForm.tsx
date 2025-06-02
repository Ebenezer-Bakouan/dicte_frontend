'use client';

import { useState } from 'react';

interface DictationFormProps {
  onSubmit: (formData: DictationFormData) => void;
  isLoading?: boolean;
}

interface DictationFormData {
  age: string;
  niveauScolaire: string;
  objectifApprentissage: string;
  difficultesSpecifiques: string;
  tempsDisponible: string;
  niveau: string;
  sujet: string;
  longueurTexte: string;
  typeContenu: string;
  vitesseLecture: string;
  includeGrammaire: boolean;
  includeConjugaison: boolean;
  includeOrthographe: boolean;
}

export default function DictationForm({ onSubmit, isLoading = false }: DictationFormProps) {
  const [formData, setFormData] = useState({
    age: '',
    niveauScolaire: '',
    objectifApprentissage: '',
    difficultesSpecifiques: '',
    tempsDisponible: '',
    niveau: '',
    sujet: '',
    longueurTexte: '',
    typeContenu: '',
    vitesseLecture: '',
    includeGrammaire: true,
    includeConjugaison: true,
    includeOrthographe: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Générer une Dictée</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Âge</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Niveau Scolaire</label>
          <select
            name="niveauScolaire"
            value={formData.niveauScolaire}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez un niveau</option>
            <option value="Étudiant">Étudiant</option>
            <option value="Collégien">Collégien</option>
            <option value="Lycéen">Lycéen</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Objectif d'Apprentissage</label>
          <select
            name="objectifApprentissage"
            value={formData.objectifApprentissage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez un objectif</option>
            <option value="accord">Accord</option>
            <option value="conjugaison">Conjugaison</option>
            <option value="orthographe">Orthographe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Difficultés Spécifiques</label>
          <select
            name="difficultesSpecifiques"
            value={formData.difficultesSpecifiques}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez une difficulté</option>
            <option value="homophone">Homophones</option>
            <option value="accord">Accords</option>
            <option value="conjugaison">Conjugaison</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Temps Disponible (minutes)</label>
          <input
            type="number"
            name="tempsDisponible"
            value={formData.tempsDisponible}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Niveau</label>
          <select
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez un niveau</option>
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sujet</label>
          <input
            type="text"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longueur du Texte</label>
          <select
            name="longueurTexte"
            value={formData.longueurTexte}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez une longueur</option>
            <option value="court">Court</option>
            <option value="moyen">Moyen</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type de Contenu</label>
          <select
            name="typeContenu"
            value={formData.typeContenu}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="narratif">Narratif</option>
            <option value="descriptif">Descriptif</option>
            <option value="argumentatif">Argumentatif</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vitesse de Lecture</label>
          <select
            name="vitesseLecture"
            value={formData.vitesseLecture}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Sélectionnez une vitesse</option>
            <option value="lente">Lente</option>
            <option value="normale">Normale</option>
            <option value="rapide">Rapide</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="includeGrammaire"
            checked={formData.includeGrammaire}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Inclure des points de grammaire</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="includeConjugaison"
            checked={formData.includeConjugaison}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Inclure des points de conjugaison</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="includeOrthographe"
            checked={formData.includeOrthographe}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Inclure des points d&apos;orthographe</label>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Génération en cours...
            </div>
          ) : (
            'Générer la Dictée'
          )}
        </button>
      </div>
    </form>
  );
} 