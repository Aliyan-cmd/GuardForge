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

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('guardforge_token');
    if (storedToken) {
      setToken(storedToken);
      // Decode payload (simple base64 decode, not secure but OK for demo)
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      setUser({ email: payload.sub, role: payload.role });
      // set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password });
    const newToken = response.data.access_token;
    localStorage.setItem('guardforge_token', newToken);
    setToken(newToken);
    const payload = JSON.parse(atob(newToken.split('.')[1]));
    setUser({ email: payload.sub, role: payload.role });
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
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
