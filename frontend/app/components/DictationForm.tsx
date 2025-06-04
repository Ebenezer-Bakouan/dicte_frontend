'use client';

import { useState } from 'react';
import { FaUser, FaBook, FaClock, FaBrain, FaGraduationCap, FaBullseye, FaMagic, FaStar, FaHeart, FaRocket } from 'react-icons/fa';

interface DictationFormProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
}

export default function DictationForm({ onSubmit = () => {}, isLoading = false }: DictationFormProps) {
  const [formData, setFormData] = useState({
    age: '',
    niveauScolaire: '',
    objectifApprentissage: '',
    difficultesSpecifiques: '',
    tempsDisponible: '15',
    niveau: 'moyen',
    sujet: '',
    longueurTexte: 'moyen',
    typeContenu: 'narratif',
    vitesseLecture: 'normale',
    includeGrammaire: true,
    includeConjugaison: true,
    includeOrthographe: true,
  });

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-y-auto">
      {/* Floating elements background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="min-h-screen w-full max-w-6xl mx-auto relative z-10 p-4">
        {/* Header Section with 3D effect */}
        <div className="text-center mb-12">
          <div className="relative">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <FaBook className="w-8 h-8 text-white" />
                  <FaStar className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Dictée Magique
              </h1>
              <p className="text-lg text-blue-100">
                Créez votre expérience d'apprentissage personnalisée
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profil Utilisateur Card */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Profil Utilisateur</h3>
                <p className="text-blue-200">Parlez-nous de vous</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">🎂</span>
                  Âge
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('age')}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 transition-all ${
                    focusedInput === 'age' 
                      ? 'border-blue-400 shadow-md' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  placeholder="Ex: 12"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">🎓</span>
                  Niveau Scolaire
                </label>
                <select
                  name="niveauScolaire"
                  value={formData.niveauScolaire}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                >
                  <option value="" className="bg-gray-800">Sélectionner votre niveau...</option>
                  <option value="CP" className="bg-gray-800">CP</option>
                  <option value="CE1" className="bg-gray-800">CE1</option>
                  <option value="CE2" className="bg-gray-800">CE2</option>
                  <option value="CM1" className="bg-gray-800">CM1</option>
                  <option value="CM2" className="bg-gray-800">CM2</option>
                  <option value="6ème" className="bg-gray-800">6ème</option>
                  <option value="5ème" className="bg-gray-800">5ème</option>
                  <option value="4ème" className="bg-gray-800">4ème</option>
                  <option value="3ème" className="bg-gray-800">3ème</option>
                  <option value="Seconde" className="bg-gray-800">Seconde</option>
                  <option value="Première" className="bg-gray-800">Première</option>
                  <option value="Terminale" className="bg-gray-800">Terminale</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  Objectif d'Apprentissage
                </label>
                <input
                  type="text"
                  name="objectifApprentissage"
                  value={formData.objectifApprentissage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                  placeholder="Ex: Améliorer les accords, préparer un examen..."
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">🤔</span>
                  Difficultés Spécifiques
                </label>
                <input
                  type="text"
                  name="difficultesSpecifiques"
                  value={formData.difficultesSpecifiques}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                  placeholder="Ex: Les homophones, la conjugaison..."
                />
              </div>
            </div>
          </div>

          {/* Paramètres de la Dictée Card */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FaMagic className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Paramètres Magiques</h3>
                <p className="text-purple-200">Personnalisez votre dictée</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  Niveau
                </label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                >
                  <option value="facile" className="bg-gray-800">🟢 Facile</option>
                  <option value="moyen" className="bg-gray-800">🟡 Moyen</option>
                  <option value="difficile" className="bg-gray-800">🔴 Difficile</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">📚</span>
                  Sujet
                </label>
                <input
                  type="text"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                  placeholder="Ex: Les animaux, l'histoire..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">📏</span>
                  Longueur du Texte
                </label>
                <select
                  name="longueurTexte"
                  value={formData.longueurTexte}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                >
                  <option value="court" className="bg-gray-800">📝 Court</option>
                  <option value="moyen" className="bg-gray-800">📄 Moyen</option>
                  <option value="long" className="bg-gray-800">📑 Long</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">🎭</span>
                  Type de Contenu
                </label>
                <select
                  name="typeContenu"
                  value={formData.typeContenu}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                >
                  <option value="narratif" className="bg-gray-800">📖 Narratif</option>
                  <option value="descriptif" className="bg-gray-800">🎨 Descriptif</option>
                  <option value="informatif" className="bg-gray-800">📊 Informatif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">🎵</span>
                  Vitesse de Lecture
                </label>
                <select
                  name="vitesseLecture"
                  value={formData.vitesseLecture}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                >
                  <option value="lente" className="bg-gray-800">🐌 Lente</option>
                  <option value="normale" className="bg-gray-800">🚶 Normale</option>
                  <option value="rapide" className="bg-gray-800">🏃 Rapide</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">⏰</span>
                  Temps Disponible
                </label>
                <select
                  name="tempsDisponible"
                  value={formData.tempsDisponible}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:border-white/50 focus:border-blue-400 focus:shadow-md transition-all"
                >
                  <option value="10" className="bg-gray-800">⏱️ 10 minutes</option>
                  <option value="15" className="bg-gray-800">⏰ 15 minutes</option>
                  <option value="20" className="bg-gray-800">🕐 20 minutes</option>
                  <option value="30" className="bg-gray-800">🕕 30 minutes</option>
                </select>
              </div>
            </div>

            {/* Checkboxes simplifiées */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'includeGrammaire', label: 'Grammaire', icon: '📝' },
                { key: 'includeConjugaison', label: 'Conjugaison', icon: '🔄' },
                { key: 'includeOrthographe', label: 'Orthographe', icon: '✍️' }
              ].map((item) => (
                <label 
                  key={item.key}
                  className={`relative flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData[item.key as keyof typeof formData] 
                      ? 'bg-white/10 border-blue-400' 
                      : 'bg-white/5 border-white/20 hover:border-white/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    name={item.key}
                    checked={formData[item.key as keyof typeof formData] as boolean}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-base">
                    {item.icon}
                  </div>
                  <span className="text-white font-medium">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bouton de soumission simplifié */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden transition-all ${
                isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              <span className="relative flex items-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Génération en cours...</span>
                  </>
                ) : (
                  <>
                    <FaRocket className="text-xl" />
                    <span>Créer ma Dictée</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}