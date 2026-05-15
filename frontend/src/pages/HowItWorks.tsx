import React from 'react';
import { Network, Search, Zap, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';

const steps = [
  { icon: <Network size={32} />, title: 'Connect Your Agents', desc: 'Integrate GuardForge SDK into your LLM wrappers in minutes. We support LangChain, LlamaIndex, and custom architectures.', color: 'text-blue-400' },
  { icon: <Search size={32} />, title: 'Define Governance Policies', desc: 'Use natural language to set rules. E.g., "Do not reveal PII", "Always cite sources", "Block prompt injections".', color: 'text-primary' },
  { icon: <Zap size={32} />, title: 'Real-Time Monitoring', desc: 'GuardForge intercepts AI calls before they execute, evaluating them against your policies in under 10ms.', color: 'text-orange-400' },
  { icon: <CheckCircle size={32} />, title: 'Safe Execution', desc: 'Compliant responses pass through seamlessly. Violations are blocked, redacted, or flagged for human review.', color: 'text-green-400' }
];

export const HowItWorks = () => {
  return (
    <PublicLayout>
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              How It <span className="text-gradient">Works</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Deploying GuardForge is frictionless. From SDK integration to real-time protection in four simple steps.
            </p>
          </div>

          <div className="space-y-16 relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-gradient-to-b from-primary/50 via-cyan-500/50 to-primary/50 transform -translate-x-1/2 hidden md:block"></div>

            {steps.map((step, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                
                {/* Step Number Badge */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0 w-12 h-12 rounded-full bg-[#0e0b1a] border-2 border-primary flex items-center justify-center font-black text-xl text-white z-10 hidden md:flex shadow-[0_0_20px_rgba(170,59,255,0.4)]">
                  {index + 1}
                </div>

                <div className="flex-1 w-full md:w-1/2">
                  <div className={`glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className={`mb-6 h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center ${step.color}`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
