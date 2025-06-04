import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://dicte-backend.onrender.com/api';

interface User {
  id: number;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string): Promise<AuthResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register/`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'inscription';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login/`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return {
    register,
    login,
    logout,
    getToken,
    error,
    loading,
  };
}; 