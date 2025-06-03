'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic } from 'lucide-react';

interface DictationPlayerProps {
  audioUrl: string;
  onComplete: (text: string) => void;
  dictationId: number | null;
}

export default function DictationPlayer({ audioUrl, onComplete, dictationId }: DictationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [userText, setUserText] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
      setPlaybackSpeed(newSpeed);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  const handleSubmit = () => {
    console.log('Texte avant soumission:', userText);
    console.log('Type du texte:', typeof userText);
    console.log('Longueur du texte:', userText.length);
    console.log('Texte après trim:', userText.trim());
    console.log('Longueur après trim:', userText.trim().length);
    
    if (!userText.trim()) {
      alert('Veuillez écrire votre dictée avant de la soumettre.');
      return;
    }
    onComplete(userText.trim());
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full max-w-4xl mx-auto relative z-10 p-4 flex flex-col"
      >
        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="relative">
                  <Mic className="w-6 h-6 text-blue-400" />
                </div>
                Dictée en cours
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">Vitesse:</span>
                <select
                  value={playbackSpeed}
                  onChange={handleSpeedChange}
                  className="px-3 py-1 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </select>
              </div>
            </div>

            {/* Lecteur Audio */}
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              {/* Barre de progression */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-white mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <motion.div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${calculateProgress()}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${calculateProgress()}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Contrôles audio */}
              <div className="flex items-center justify-center space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetAudio}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-all"
                  title="Recommencer"
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlayPause}
                  className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
                  title={isPlaying ? "Pause" : "Lecture"}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </motion.button>

                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-all"
                    title={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </motion.button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Zone de texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <textarea
                ref={textareaRef}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Écrivez votre dictée ici..."
                className="w-full h-64 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </motion.div>

          {/* Bouton de soumission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
            >
              <span className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Terminer la dictée
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
} 