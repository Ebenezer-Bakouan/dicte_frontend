export const API_URL = 'https://dicte-backend.onrender.com';

export const API_ENDPOINTS = {
  GENERATE_DICTATION: `${API_URL}/api/dictation/generate/`,
  CORRECT_DICTATION: `${API_URL}/api/dictation/correct/`,
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}; 