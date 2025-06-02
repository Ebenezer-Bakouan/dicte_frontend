'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, AlertCircle, ArrowLeft, Settings, BookOpen, Target, Clock, Brain } from 'lucide-react';

interface DictationData {
  text: string;
  audioUrl: string;
  points: {
    type: string;
    description: string;
    position: number;
  }[];
}

function DictationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dictationData, setDictationData] = useState<DictationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [userText, setUserText] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  // Texte de dictée simulé (en production, ce serait généré par IA)
  const dicteeText = "Les oiseaux migrateurs parcourent des milliers de kilomètres chaque année. Ils suivent des routes invisibles, guidés par leur instinct et les étoiles. Cette migration extraordinaire reste l'un des phénomènes les plus fascinants de la nature.";
  
  // Simulation d'audio (en production, ce serait un vrai fichier audio)
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration || 60);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime || 0);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const resetAudio = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  const getWordCount = () => {
    return userText.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const estimateAccuracy = () => {
    if (!userText.trim()) return 0;
    const userWords = userText.toLowerCase().trim().split(/\s+/);
    const correctWords = dicteeText.toLowerCase().split(/\s+/);
    let matches = 0;
    
    userWords.forEach((word, index) => {
      if (correctWords[index] && word === correctWords[index]) {
        matches++;
      }
    });
    
    return Math.round((matches / Math.max(userWords.length, correctWords.length)) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Dictée</h1>
            <p className="text-sm text-gray-600 mt-1">
              Thème: {searchParams.get('sujet') || 'Non spécifié'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{getWordCount()} mots</span>
            {userText.trim() && (
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                {estimateAccuracy()}%
              </span>
            )}
          </div>
        </div>

        {/* Zone Audio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Lecteur Audio</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Vitesse:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>
          
          {/* Contrôles audio */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={resetAudio}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Recommencer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              title={isPlaying ? "Pause" : "Lecture"}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Zone de texte */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Votre dictée</h2>
            <div className="flex items-center space-x-4 text-sm">
              {userText.trim() && (
                <>
                  <span className="text-gray-600">
                    {getWordCount()} / {dicteeText.split(' ').length} mots
                  </span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      estimateAccuracy() >= 80 ? 'bg-green-500' : 
                      estimateAccuracy() >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-gray-600">{estimateAccuracy()}% précision</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Commencez à écrire votre dictée ici..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800 leading-relaxed"
              style={{ fontSize: '16px', lineHeight: '1.6' }}
            />
            
            {userText.trim() && (
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                {estimateAccuracy() >= 80 ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => {
              setUserText('');
              resetAudio();
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Effacer
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert('Fonctionnalité de sauvegarde à implémenter')}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Sauvegarder
            </button>
            
            <button
              onClick={() => alert('Analyse détaillée à implémenter')}
              disabled={!userText.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                userText.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Analyser
            </button>
          </div>
        </div>
      </div>

      {/* CSS pour le slider de volume */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default function DictationPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DictationContent />
    </Suspense>
  );
}