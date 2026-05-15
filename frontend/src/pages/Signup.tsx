import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';

const PasswordStrength = ({ pw }: { pw: string }) => {
  const checks = [
    { label: '8+ characters', ok: pw.length >= 8 },
    { label: 'Uppercase', ok: /[A-Z]/.test(pw) },
    { label: 'Number', ok: /\d/.test(pw) },
  ];
  return (
    <div className="flex gap-2 mt-2">
      {checks.map(c => (
        <div key={c.label} className={`flex items-center gap-1 text-[10px] font-semibold transition-colors ${c.ok ? 'text-green-400' : 'text-gray-600'}`}>
          <CheckCircle size={10} className={c.ok ? 'text-green-400' : 'text-gray-700'} />
          {c.label}
        </div>
      ))}
    </div>
  );
};

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters long.'); return; }
    setLoading(true);
    try {
      await signup(email, password, fullName);
      navigate('/');
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) setError(detail.map((d: any) => d.msg).join('. ') || 'Registration failed');
      else if (typeof detail === 'string') setError(detail);
      else setError('Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen mesh-bg grid-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="orb orb-purple w-[500px] h-[500px] top-0 right-0 opacity-40" />
      <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 -left-40 opacity-30" />

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-primary to-purple-400 animate-gradient" />

          <div className="p-10">
            <div className="text-center mb-10">
              <div className="inline-flex h-16 w-16 items-center justify-center bg-primary/10 border border-primary/30 rounded-2xl mb-5 animate-pulse-glow">
                <Shield size={30} className="text-primary" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Join <span className="text-gradient">GuardForge</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">Secure your AI infrastructure in minutes</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3.5 text-sm flex items-start gap-2 animate-fade-in">
                <span className="shrink-0 mt-0.5">⚠</span> {error}
              </div>
            )}

            <form onSubmit={handle} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                    required placeholder="Jane Smith"
                    className="input-premium w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-600" />
                </div>
              </div>
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
                    required placeholder="Min. 8 characters"
                    className="input-premium w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-600" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {password && <PasswordStrength pw={password} />}
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 group mt-2 disabled:opacity-60">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  <>Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-primary font-semibold hover:text-primary-light transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/landing" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
