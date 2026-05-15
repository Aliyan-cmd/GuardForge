// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from '../api/client';

interface AuthContextType {
  token: string | null;
  user: { email: string; role: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, fullName?: string, role?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  // Helper to decode JWT safely
  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return null;
    }
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('guardforge_token');
    if (storedToken) {
      const payload = decodeJWT(storedToken);
      if (payload) {
        setToken(storedToken);
        setUser({ email: payload.sub, role: payload.role });
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } else {
        localStorage.removeItem('guardforge_token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password });
    const newToken = response.data.access_token;
    localStorage.setItem('guardforge_token', newToken);
    setToken(newToken);
    const payload = decodeJWT(newToken);
    if (payload) {
      setUser({ email: payload.sub, role: payload.role });
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }
  };

  const logout = () => {
    localStorage.removeItem('guardforge_token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const signup = async (email: string, password: string, fullName = '', role = 'viewer') => {
    await axios.post('/auth/signup', { email, password, full_name: fullName, role });
    // auto‑login after signup
    await login(email, password);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
