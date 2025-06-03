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
        <div className="text-center mb-12 transform perspective-1000">
          <div 
            className="inline-block transform-gpu transition-all duration-700 hover:scale-110 hover:rotate-y-12"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(10deg) rotateY(-5deg)'
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <FaBook className="w-12 h-12 text-white transform rotate-12" />
                    <FaStar className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
                  </div>
                </div>
                <h1 className="text-5xl font-black text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Dictée Magique
                </h1>
                <p className="text-xl text-blue-100 font-medium">
                  Créez votre expérience d'apprentissage personnalisée ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profil Utilisateur Card */}
          <div
            className={`relative transform transition-all duration-500 ${
              hoveredCard === 'profile' ? 'scale-105 rotate-1' : ''
            }`}
            onMouseEnter={() => setHoveredCard('profile')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === 'profile' ? 'rotateX(5deg) rotateY(-2deg) scale(1.02)' : 'rotateX(2deg)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="relative mr-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6">
                    <FaUser className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-bounce"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Profil Utilisateur</h3>
                  <p className="text-cyan-200">Parlez-nous de vous 👤</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎂</span>
                    Âge
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('age')}
                      onBlur={() => setFocusedInput(null)}
                      className={`w-full px-6 py-4 bg-white/10 border-2 rounded-2xl text-white placeholder-gray-400 transition-all duration-300 ${
                        focusedInput === 'age' 
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/25 transform scale-105' 
                          : 'border-white/30 hover:border-white/50'
                      }`}
                      placeholder="Ex: 12"
                    />
                    {focusedInput === 'age' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎓</span>
                    Niveau Scolaire
                  </label>
                  <select
                    name="niveauScolaire"
                    value={formData.niveauScolaire}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white hover:border-white/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800 text-gray-400">Sélectionner votre niveau...</option>
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
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Objectif d'Apprentissage
                  </label>
                  <input
                    type="text"
                    name="objectifApprentissage"
                    value={formData.objectifApprentissage}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white placeholder-gray-400 hover:border-white/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                    placeholder="Ex: Améliorer les accords, préparer un examen..."
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🤔</span>
                    Difficultés Spécifiques
                  </label>
                  <input
                    type="text"
                    name="difficultesSpecifiques"
                    value={formData.difficultesSpecifiques}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white placeholder-gray-400 hover:border-white/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                    placeholder="Ex: Les homophones, la conjugaison..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Paramètres de la Dictée Card */}
          <div
            className={`relative transform transition-all duration-500 ${
              hoveredCard === 'settings' ? 'scale-105 rotate-1' : ''
            }`}
            onMouseEnter={() => setHoveredCard('settings')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === 'settings' ? 'rotateX(5deg) rotateY(2deg) scale(1.02)' : 'rotateX(2deg)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="relative mr-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                    <FaMagic className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Paramètres Magiques</h3>
                  <p className="text-purple-200">Personnalisez votre dictée ✨</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Niveau
                  </label>
                  <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white hover:border-white/50 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300"
                  >
                    <option value="facile" className="bg-gray-800">🟢 Facile</option>
                    <option value="moyen" className="bg-gray-800">🟡 Moyen</option>
                    <option value="difficile" className="bg-gray-800">🔴 Difficile</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white placeholder-gray-400 hover:border-white/50 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300"
                    placeholder="Ex: Les animaux, l'histoire..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">📏</span>
                    Longueur du Texte
                  </label>
                  <select
                    name="longueurTexte"
                    value={formData.longueurTexte}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white hover:border-white/50 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300"
                  >
                    <option value="court" className="bg-gray-800">📝 Court</option>
                    <option value="moyen" className="bg-gray-800">📄 Moyen</option>
                    <option value="long" className="bg-gray-800">📑 Long</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎭</span>
                    Type de Contenu
                  </label>
                  <select
                    name="typeContenu"
                    value={formData.typeContenu}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white hover:border-white/50 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300"
                  >
                    <option value="narratif" className="bg-gray-800">📖 Narratif</option>
                    <option value="descriptif" className="bg-gray-800">🎨 Descriptif</option>
                    <option value="informatif" className="bg-gray-800">📊 Informatif</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎵</span>
                    Vitesse de Lecture
                  </label>
                  <select
                    name="vitesseLecture"
                    value={formData.vitesseLecture}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white hover:border-white/50 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300"
                  >
                    <option value="lente" className="bg-gray-800">🐌 Lente</option>
                    <option value="normale" className="bg-gray-800">🚶 Normale</option>
                    <option value="rapide" className="bg-gray-800">🏃 Rapide</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">⏰</span>
                    Temps Disponible
                  </label>
                  <select
                    name="tempsDisponible"
                    value={formData.tempsDisponible}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white hover:border-white/50 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300"
                  >
                    <option value="10" className="bg-gray-800">⏱️ 10 minutes</option>
                    <option value="15" className="bg-gray-800">⏰ 15 minutes</option>
                    <option value="20" className="bg-gray-800">🕐 20 minutes</option>
                    <option value="30" className="bg-gray-800">🕕 30 minutes</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes avec effets 3D */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'includeGrammaire', label: 'Grammaire', icon: '📝', color: 'from-green-400 to-emerald-500' },
                  { key: 'includeConjugaison', label: 'Conjugaison', icon: '🔄', color: 'from-blue-400 to-cyan-500' },
                  { key: 'includeOrthographe', label: 'Orthographe', icon: '✍️', color: 'from-pink-400 to-rose-500' }
                ].map((item) => (
                  <label 
                    key={item.key}
                    className={`relative flex items-center space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData[item.key as keyof typeof formData] 
                        ? `bg-gradient-to-r ${item.color} border-white/40 shadow-lg` 
                        : 'bg-white/5 border-white/20 hover:border-white/40'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        name={item.key}
                        checked={formData[item.key as keyof typeof formData] as boolean}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${
                        formData[item.key as keyof typeof formData] 
                          ? 'bg-white/20 shadow-inner' 
                          : 'bg-white/10'
                      }`}>
                        {item.icon}
                      </div>
                    </div>
                    <span className="text-white font-semibold text-lg">{item.label}</span>
                    {formData[item.key as keyof typeof formData] && (
                      <div className="absolute top-2 right-2">
                        <FaHeart className="w-4 h-4 text-white animate-pulse" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button avec effet 3D spectaculaire */}
          <div className="text-center pt-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className={`relative group inline-flex items-center justify-center px-12 py-6 text-2xl font-black text-white bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 rounded-full overflow-hidden transition-all duration-500 transform hover:scale-110 hover:rotate-2 shadow-2xl ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-yellow-500/25'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(5deg) rotateY(-2deg)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-4">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="animate-pulse">Génération Magique...</span>
                      <FaMagic className="text-2xl animate-bounce" />
                    </>
                  ) : (
                    <>
                      <FaRocket className="text-3xl group-hover:animate-bounce" />
                      <span>Créer ma Dictée Magique</span>
                      <div className="flex gap-1">
                        <FaStar className="text-yellow-300 animate-pulse" />
                        <FaStar className="text-yellow-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <FaStar className="text-yellow-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}