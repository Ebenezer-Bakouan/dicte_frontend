'use client';

import React, { useState } from 'react';
import { ArrowRight, User, Settings, BookOpen, Target, Clock, Brain } from 'lucide-react';

export default function SetupPage({ onNext }) {
  const [profilUtilisateur, setProfilUtilisateur] = useState({
    age: '',
    niveauScolaire: '',
    objectifApprentissage: '',
    difficultesSpecifiques: '',
    tempsDisponible: 15
  });
  
  const [parametresDictee, setParametresDictee] = useState({
    niveau: 'moyen',
    sujet: '',
    longueurTexte: 'moyen',
    typeContenu: 'narratif',
    vitesseLecture: 'normale',
    includeGrammaire: true,
    includeConjugaison: true,
    includeOrthographe: true,
    motsClesImportants: ''
  });

  const niveauxScolaires = [
    'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', 
    'Seconde', 'Première', 'Terminale', 'Étudiant', 'Adulte'
  ];

  const niveaux = [
    { id: 'facile', nom: 'Débutant', description: 'Phrases courtes, vocabulaire simple' },
    { id: 'moyen', nom: 'Intermédiaire', description: 'Phrases complexes, vocabulaire varié' },
    { id: 'difficile', nom: 'Avancé', description: 'Texte élaboré, vocabulaire soutenu' }
  ];

  const typesContenu = [
    { id: 'narratif', nom: 'Récit/Histoire' },
    { id: 'descriptif', nom: 'Description' },
    { id: 'informatif', nom: 'Informatif' },
    { id: 'dialogue', nom: 'Dialogue' },
    { id: 'poetique', nom: 'Poétique' }
  ];

  const isFormValid = () => {
    return parametresDictee.sujet.trim() && 
           (profilUtilisateur.niveauScolaire || profilUtilisateur.age);
  };

  const handleNext = () => {
    if (isFormValid()) {
      onNext({ profilUtilisateur, parametresDictee });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Dictée Intelligente
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Configurez votre profil pour une expérience d'apprentissage personnalisée
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profil utilisateur */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Votre Profil</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Âge
                  </label>
                  <input
                    type="number"
                    value={profilUtilisateur.age}
                    onChange={(e) => setProfilUtilisateur(prev => ({...prev, age: e.target.value}))}
                    placeholder="Ex: 12"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Niveau scolaire
                  </label>
                  <select
                    value={profilUtilisateur.niveauScolaire}
                    onChange={(e) => setProfilUtilisateur(prev => ({...prev, niveauScolaire: e.target.value}))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Sélectionner...</option>
                    {niveauxScolaires.map(niveau => (
                      <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Objectif d'apprentissage
                </label>
                <input
                  type="text"
                  value={profilUtilisateur.objectifApprentissage}
                  onChange={(e) => setProfilUtilisateur(prev => ({...prev, objectifApprentissage: e.target.value}))}
                  placeholder="Ex: Améliorer les accords, préparer un examen..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Difficultés spécifiques
                </label>
                <input
                  type="text"
                  value={profilUtilisateur.difficultesSpecifiques}
                  onChange={(e) => setProfilUtilisateur(prev => ({...prev, difficultesSpecifiques: e.target.value}))}
                  placeholder="Ex: Les homophones, la conjugaison..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Temps disponible
                </label>
                <select
                  value={profilUtilisateur.tempsDisponible}
                  onChange={(e) => setProfilUtilisateur(prev => ({...prev, tempsDisponible: parseInt(e.target.value)}))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Configuration dictée */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                <Settings className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Configuration</h2>
            </div>
            
            <div className="space-y-6">
              {/* Sujet */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Thème de la dictée *
                </label>
                <input
                  type="text"
                  value={parametresDictee.sujet}
                  onChange={(e) => setParametresDictee(prev => ({...prev, sujet: e.target.value}))}
                  placeholder="Ex: Les animaux, l'histoire, les sciences..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Niveau */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Niveau de difficulté
                </label>
                <div className="space-y-2">
                  {niveaux.map((niveau) => (
                    <label key={niveau.id} className="flex items-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="niveau"
                        value={niveau.id}
                        checked={parametresDictee.niveau === niveau.id}
                        onChange={(e) => setParametresDictee(prev => ({...prev, niveau: e.target.value}))}
                        className="mr-3 text-blue-600"
                      />
                      <div>
                        <div className="font-medium text-slate-800">{niveau.nom}</div>
                        <div className="text-sm text-slate-600">{niveau.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Paramètres avancés */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type de contenu
                  </label>
                  <select
                    value={parametresDictee.typeContenu}
                    onChange={(e) => setParametresDictee(prev => ({...prev, typeContenu: e.target.value}))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    {typesContenu.map(type => (
                      <option key={type.id} value={type.id}>{type.nom}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Longueur
                  </label>
                  <select
                    value={parametresDictee.longueurTexte}
                    onChange={(e) => setParametresDictee(prev => ({...prev, longueurTexte: e.target.value}))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    <option value="court">Court</option>
                    <option value="moyen">Moyen</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>

              {/* Points d'attention */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Points d'attention
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={parametresDictee.includeGrammaire}
                      onChange={(e) => setParametresDictee(prev => ({...prev, includeGrammaire: e.target.checked}))}
                      className="mr-2 text-blue-600 rounded"
                    />
                    <span className="text-slate-700">Grammaire</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={parametresDictee.includeConjugaison}
                      onChange={(e) => setParametresDictee(prev => ({...prev, includeConjugaison: e.target.checked}))}
                      className="mr-2 text-blue-600 rounded"
                    />
                    <span className="text-slate-700">Conjugaison</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={parametresDictee.includeOrthographe}
                      onChange={(e) => setParametresDictee(prev => ({...prev, includeOrthographe: e.target.checked}))}
                      className="mr-2 text-blue-600 rounded"
                    />
                    <span className="text-slate-700">Orthographe</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de validation */}
        <div className="mt-12 text-center">
          <button
            onClick={handleNext}
            disabled={!isFormValid()}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center mx-auto ${
              isFormValid()
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Brain className="w-5 h-5 mr-2" />
            Générer ma dictée
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          {!isFormValid() && (
            <p className="text-sm text-slate-500 mt-2">
              Veuillez remplir le thème et au moins votre âge ou niveau scolaire
            </p>
          )}
        </div>
      </div>
    </div>
  );
}