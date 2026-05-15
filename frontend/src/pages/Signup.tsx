// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, fullName);
      navigate('/');
    } catch (err: any) {
      const message = err.response?.data?.detail;
      if (Array.isArray(message)) {
        setError(message[0].msg || 'Registration failed');
      } else {
        setError(message || 'Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#08060d]">
      <form onSubmit={handle} className="glass p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join GuardForge</h1>
          <p className="text-gray-400">Secure your AI infrastructure today</p>
        </div>

        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm border border-red-500/50">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-1 ml-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary outline-none transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-1 ml-1">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-8 py-3 rounded-xl text-lg font-bold">Create Account</Button>

        <div className="text-center mt-6 text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
        </div>
      </form>
    </div>
  );
};
