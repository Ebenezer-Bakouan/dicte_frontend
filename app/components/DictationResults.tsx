'use client';

interface DictationResultsProps {
  score: number;
  errors: string[];
  correction: string;
  total_words?: number;
  error_count?: number;
}

export default function DictationResults({ score, errors, correction, total_words, error_count }: DictationResultsProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Résultats de la Dictée</h2>
      
      <div className="mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-2">{score}/100</div>
          <div className="text-gray-600">
            {total_words} mots au total, {error_count} erreurs
          </div>
        </div>
      </div>

      {errors.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Erreurs trouvées :</h3>
          <ul className="space-y-2">
            {errors.map((error, index) => (
              <li key={index} className="p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-md text-center">
          Félicitations ! Aucune erreur trouvée.
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Correction :</h3>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="whitespace-pre-wrap">{correction}</p>
        </div>
      </div>
    </div>
  );
} 