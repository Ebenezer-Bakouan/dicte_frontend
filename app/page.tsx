'use client';

import { useState } from 'react';
import DictationForm from './components/DictationForm';
import DictationPlayer from './components/DictationPlayer';
import DictationResults from './components/DictationResults';

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

type DictationResponse = {
  text: string;
  audio_url: string;
  audio_files: string[];
  // Ajoutez d'autres propriétés si nécessaire
};

export default function Home() {
  const [step, setStep] = useState<'form' | 'player' | 'results'>('form');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    errors: string[];
    correction: string;
  } | null>(null);

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as DictationResponse;
      console.log('Réponse complète du serveur:', data);

      // S'assurer que nous avons une URL d'audio valide
      if (data.audio_files && data.audio_files.length > 0) {
        const audioPath = data.audio_files[0];
        console.log('Chemin de l\'audio:', audioPath);
        
        // Vérifier que le fichier audio existe
        const audioResponse = await fetch(`https://dicte-backend.onrender.com/${audioPath}`);
        console.log('Statut de la vérification audio:', audioResponse.status);
        
        if (audioResponse.ok) {
          setAudioUrl(`/${audioPath}`);
          setStep('player');
        } else {
          console.error('Erreur lors de la vérification de l\'audio');
          throw new Error('Le fichier audio n\'a pas pu être généré');
        }
      } else {
        console.error('Pas de fichiers audio dans la réponse');
        throw new Error('Aucun fichier audio généré');
      }
    } catch (error) {
      console.error('Erreur détaillée:', error);
      alert('Une erreur est survenue lors de la génération de la dictée');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDictationComplete = async (userText: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://dicte-backend.onrender.com/api/dictation/correct/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userText }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la correction de la dictée');
      }

      const data = await response.json();
      setResults(data);
      setStep('results');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la correction de la dictée');
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