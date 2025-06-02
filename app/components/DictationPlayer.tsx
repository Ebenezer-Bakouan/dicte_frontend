'use client';

import { useState, useRef, useEffect } from 'react';

interface DictationPlayerProps {
  audioUrl: string;
  onComplete: (userText: string) => void;
}

export default function DictationPlayer({ audioUrl, onComplete }: DictationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userText, setUserText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      // Lancer l'audio automatiquement quand il est chargé
      audioRef.current.addEventListener('canplaythrough', () => {
        audioRef.current?.play();
        setIsPlaying(true);
      });
    }
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSubmit = () => {
    onComplete(userText);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          className="w-full"
        />
        <div className="flex justify-center space-x-4">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Relancer la Dictée
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Pause
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Écrivez ce que vous entendez :
        </label>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          className="w-full h-48 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Commencez à écrire ici..."
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Terminer la Dictée
        </button>
      </div>
    </div>
  );
} 