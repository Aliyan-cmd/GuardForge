import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Globe, Cpu, Lock, Mail } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Docs', path: '/docs' },
    { name: 'Pricing', path: '/pricing' }
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-blur' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center animate-pulse-glow">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">Guard<span className="text-gradient">Forge</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path}
              className={`hover:text-white transition-colors duration-200 relative group ${location.pathname === link.path ? 'text-white' : ''}`}>
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/Aliyan-cmd/GuardForge" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-2">
            <GithubIcon />
          </a>
          <Link to="/login" className="btn-secondary px-5 py-2 rounded-xl text-sm font-semibold text-white">Sign In</Link>
          <Link to="/signup" className="btn-primary px-5 py-2 rounded-xl text-sm font-bold text-white">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="relative pt-32 pb-12 overflow-hidden border-t border-white/5">
    <div className="orb orb-purple w-96 h-96 -bottom-48 -left-48 opacity-20" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 text-left">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(170,59,255,0.3)]">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">Guard<span className="text-primary">Forge</span></span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
            The world's first comprehensive AI governance platform. Building trust between humans and machines since 2024.
          </p>
          <div className="flex gap-4">
            {[Globe, Cpu, Lock, Mail].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Product</h4>
          <ul className="space-y-4 text-xs text-gray-500 font-medium">
            {['Trace Explorer', 'Policy Engine', 'Red Teaming', 'Integrations'].map(l => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Company</h4>
          <ul className="space-y-4 text-xs text-gray-500 font-medium">
            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(l => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Support</h4>
          <ul className="space-y-4 text-xs text-gray-500 font-medium">
            {['Documentation', 'API Reference', 'Status Page', 'Contact Support'].map(l => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          © 2026 GuardForge AI Inc. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/10 rounded-full px-4 py-1.5 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] text-green-400 font-black uppercase tracking-widest">Global Systems Online</span>
        </div>
      </div>
    </div>
  </footer>
);

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mesh-bg min-h-screen text-white noise-overlay">
      <Navbar />
      <div className="pt-24 min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
