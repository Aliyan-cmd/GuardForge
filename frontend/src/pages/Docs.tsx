import React from 'react';
import { BookOpen, Code, Terminal, FileJson } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';

export const Docs = () => {
  return (
    <PublicLayout>
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Documentation
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Everything you need to integrate, configure, and scale GuardForge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: <BookOpen size={24} />, title: 'Getting Started', desc: 'Quickstart guides and core concepts.', color: 'text-blue-400' },
              { icon: <Code size={24} />, title: 'SDK Reference', desc: 'Python and Node.js SDK documentation.', color: 'text-primary' },
              { icon: <Terminal size={24} />, title: 'API Documentation', desc: 'REST API endpoints and models.', color: 'text-green-400' },
              { icon: <FileJson size={24} />, title: 'Policy Syntax', desc: 'How to write rules in JSON and natural language.', color: 'text-orange-400' }
            ].map((d, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${d.color}`}>
                  {d.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{d.title}</h3>
                <p className="text-sm text-gray-400">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/5 text-center animate-fade-in delay-300">
            <h2 className="text-2xl font-bold text-white mb-4">API Documentation is generating...</h2>
            <p className="text-gray-400 mb-6">Our full technical documentation site is currently being deployed.</p>
            <div className="inline-flex items-center justify-center p-1 bg-white/5 rounded-xl border border-white/10">
              <code className="text-sm text-primary px-4 py-2 font-mono">npm install @guardforge/sdk</code>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
