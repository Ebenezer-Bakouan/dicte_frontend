'use client';

import { useState } from 'react';
import DictationForm from '../components/DictationForm';
import DictationPlayer from '../components/DictationPlayer';
import DictationResults from '../components/DictationResults';

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

export default function DictationPage() {
  const [step, setStep] = useState<'form' | 'player' | 'results'>('form');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    errors: string[];
    correction: string;
  } | null>(null);
  const [currentDictationId, setCurrentDictationId] = useState<number | null>(null);

  const handleFormSubmit = async (formData: DictationFormData) => {
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

      const responseData = await response.json();
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

  const handleDictationComplete = async (userText: string) => {
    try {
      setIsLoading(true);
      if (!currentDictationId) {
        console.error('ID de dictée manquant');
        alert('Erreur : ID de dictée manquant');
        return;
      }
      
      console.log('Texte reçu de DictationPlayer:', userText);
      console.log('Type du texte:', typeof userText);
      console.log('Longueur du texte:', userText.length);
      console.log('ID de la dictée:', currentDictationId);
      
      if (!userText.trim()) {
        console.error('Texte vide');
        alert('Veuillez écrire votre dictée avant de la soumettre.');
        return;
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

      console.log('Statut de la réponse:', response.status);
      const responseText = await response.text();
      console.log('Réponse brute du serveur:', responseText);

      if (!response.ok) {
        let errorMessage = 'Erreur lors de la correction de la dictée';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Erreur lors du parsing de la réponse:', e);
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      console.log('Données de correction:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResults(data);
      setStep('results');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      alert(error instanceof Error ? error.message : 'Une erreur est survenue lors de la correction de la dictée');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setStep('form');
    setAudioUrl('');
    setResults(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {step === 'form' && <DictationForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
        {step === 'player' && audioUrl && (
          <DictationPlayer audioUrl={audioUrl} onComplete={handleDictationComplete} />
        )}
        {step === 'results' && results && (
          <>
            <DictationResults {...results} />
            <div className="mt-6 text-center">
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Nouvelle Dictée
              </button>
                  </div>
                </>
              )}
            </div>
    </main>
  );
}