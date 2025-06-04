'use client';

import React, { useState } from 'react';
import DictationForm from '../components/DictationForm';
import DictationPlayer from '../components/DictationPlayer';
import DictationResults from '../components/DictationResults';
import AuthGuard from '../components/AuthGuard';

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

interface DictationResponse {
  id: number;
  text: string;
  audio_url: string;
  title: string;
  difficulty: string;
}

interface DictationResults {
  score: number;
  errors: string[];
  correction: string;
}

export default function DictationPage(): React.JSX.Element {
  const [step, setStep] = useState<'form' | 'player' | 'results'>('form');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<DictationResults | null>(null);
  const [currentDictationId, setCurrentDictationId] = useState<number | null>(null);

  const handleFormSubmit = async (formData: DictationFormData): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('Envoi des données au serveur:', formData);
      
      const response = await fetch('https://dicte-backend.onrender.com/api/dictation/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de la dictée');
      }

      const responseData: DictationResponse = await response.json();
      console.log('Réponse complète du serveur:', responseData);

      if (responseData.audio_url) {
        const audioPath = responseData.audio_url;
        console.log('Chemin de l\'audio:', audioPath);
        setCurrentDictationId(responseData.id);

        // Vérifier si le fichier audio est accessible
        try {
          const audioResponse = await fetch(audioPath);
          if (audioResponse.ok) {
            console.log('Statut de la vérification audio:', audioResponse.status);
            setAudioUrl(audioPath);
            setStep('player');
          } else {
            console.error('Statut de la vérification audio:', audioResponse.status);
            throw new Error('Erreur lors de la vérification de l\'audio');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification de l\'audio');
          console.error('Erreur détaillée:', error);
          throw error;
        }
      } else {
        console.error('Pas de fichier audio dans la réponse');
        throw new Error('Pas de fichier audio dans la réponse');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la génération de la dictée');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDictationComplete = async (userText: string): Promise<void> => {
    try {
      setIsLoading(true);
      if (!currentDictationId) {
        throw new Error('ID de dictée manquant');
      }
      
      const response = await fetch('https://dicte-backend.onrender.com/api/dictation/correct/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_text: userText,
          dictation_id: currentDictationId 
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la correction de la dictée');
      }

      const data: DictationResults = await response.json();
      setResults(data);
      setStep('results');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la correction de la dictée');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = (): void => {
    setStep('form');
    setAudioUrl('');
    setResults(null);
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {step === 'form' && <DictationForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
          {step === 'player' && audioUrl && (
            <DictationPlayer audioUrl={audioUrl} onComplete={handleDictationComplete} />
          )}
          {step === 'results' && results && (
            <React.Fragment>
              <DictationResults {...results} />
              <div className="mt-6 text-center">
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Nouvelle Dictée
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </main>
    </AuthGuard>
  );
} 