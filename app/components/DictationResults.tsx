'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Star } from 'lucide-react';

interface DictationResultsProps {
  score: number;
  errors: string[];
  correction: string;
}

export default function DictationResults({ score, errors, correction }: DictationResultsProps) {
  const getScoreColor = () => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    if (score >= 90) return 'Excellent !';
    if (score >= 70) return 'Bien !';
    return 'À améliorer';
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
        className="min-h-screen w-full max-w-4xl mx-auto relative z-10 p-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          {/* Score */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Résultats</h2>
            <div className="flex items-center justify-center gap-2">
              <span className={`text-5xl font-bold ${getScoreColor()}`}>{score}%</span>
              <span className="text-lg text-gray-300">{getScoreMessage()}</span>
            </div>
          </motion.div>

          {/* Erreurs */}
          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Erreurs à corriger
              </h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <ul className="space-y-2">
                  {errors.map((error, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Correction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Texte corrigé
            </h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-gray-300 whitespace-pre-wrap">{correction}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 