import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen mesh-bg grid-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* orbs */}
      <div className="orb orb-purple w-[500px] h-[500px] -top-40 -left-40 opacity-50" />
      <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 right-0 opacity-30" />

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        {/* card */}
        <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          {/* top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-400 to-cyan-400 animate-gradient" />

          <div className="p-10">
            {/* logo */}
            <div className="text-center mb-10">
              <div className="inline-flex h-16 w-16 items-center justify-center bg-primary/10 border border-primary/30 rounded-2xl mb-5 animate-pulse-glow">
                <Shield size={30} className="text-primary" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Guard<span className="text-gradient">Forge</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">Sign in to your command center</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3.5 text-sm flex items-start gap-2 animate-fade-in">
                <span className="shrink-0 mt-0.5">⚠</span> {error}
              </div>
            )}

            <form onSubmit={handle} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    required placeholder="you@company.com"
                    className="input-premium w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    required placeholder="••••••••"
                    className="input-premium w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-600" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 group mt-2 disabled:opacity-60">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <>Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">New to GuardForge? </span>
              <Link to="/signup" className="text-primary font-semibold hover:text-primary-light transition-colors">
                Create an account
              </Link>
            </div>
          </div>
        </div>

        {/* back to landing */}
        <div className="text-center mt-6">
          <Link to="/landing" className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center justify-center gap-1">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
