
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { LogOut, Loader2 } from 'lucide-react';

export const Signout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="h-full flex items-center justify-center p-8">
      <Card className="max-w-md w-full text-center p-12 space-y-6 border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 animate-pulse">
          <LogOut size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Signing Out</h2>
          <p className="text-gray-500 text-sm">Clearing your secure governance session...</p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="animate-spin text-primary" size={24} />
        </div>
      </Card>
    </div>
  );
};
