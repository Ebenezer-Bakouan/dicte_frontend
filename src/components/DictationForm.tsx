import { API_ENDPOINTS, API_CONFIG } from '../config/api';
import { DictationParams, DictationResponse } from '../types/dictation';

const generateDictation = async (params: DictationParams): Promise<DictationResponse> => {
  try {
    const response = await fetch(API_ENDPOINTS.GENERATE_DICTATION, {
      method: 'POST',
      ...API_CONFIG,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération de la dictée');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}; 