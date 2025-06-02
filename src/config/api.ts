export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  GENERATE_DICTATION: `${API_URL}/api/dictation/generate/`,
  CORRECT_DICTATION: `${API_URL}/api/dictation/correct/`,
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}; 