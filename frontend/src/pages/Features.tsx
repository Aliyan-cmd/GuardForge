import React from 'react';
import { Eye, Shield, AlertTriangle } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';

const featuresList = [
  { icon:<Eye size={28}/>, title:'Real-Time Trace Explorer', desc:'Watch every AI decision unfold token by token. Live WebSocket streaming shows you exactly what your agents are thinking.', color:'text-primary', bg:'bg-primary/10', border:'border-primary/20', tag:'Live' },
  { icon:<Shield size={28}/>, title:'AI Policy Engine', desc:'Generate and enforce governance policies automatically. Define rules in plain language and enforce guardrails instantly.', color:'text-green-400', bg:'bg-green-500/10', border:'border-green-500/20', tag:'AI-Powered' },
  { icon:<AlertTriangle size={28}/>, title:'Red Team Simulations', desc:'Continuously probe your AI agents with adversarial attacks. Detect prompt injection and jailbreak attempts pre-production.', color:'text-red-400', bg:'bg-red-500/10', border:'border-red-500/20', tag:'Security' },
];

export const Features = () => {
  return (
    <PublicLayout>
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Enterprise <span className="text-gradient">Features</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Everything you need to secure, monitor, and govern your AI agents at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((f, i) => (
              <div key={f.title} className={`relative feature-card glass-card rounded-2xl p-8 border ${f.border} overflow-hidden text-left animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
                <span className={`absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${f.bg} ${f.color} border ${f.border}`}>{f.tag}</span>
                <div className={`h-16 w-16 ${f.bg} rounded-2xl flex items-center justify-center ${f.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
