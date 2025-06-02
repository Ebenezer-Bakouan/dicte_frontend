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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
        {/* Score */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Star className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Résultats</h2>
          <div className="flex items-center justify-center gap-2">
            <span className={`text-6xl font-bold ${getScoreColor()}`}>{score}%</span>
            <span className="text-xl text-gray-300">{getScoreMessage()}</span>
          </div>
        </motion.div>

        {/* Erreurs */}
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
              Erreurs à corriger
            </h3>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <ul className="space-y-3">
                {errors.map((error, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
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
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Texte corrigé
          </h3>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <p className="text-gray-300 whitespace-pre-wrap">{correction}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 