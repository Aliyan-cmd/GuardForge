import React from 'react';
import { Check, Zap } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect for exploring GuardForge in development.',
    features: ['Up to 2 AI Agents', '1,000 Executions / mo', 'Basic Guardrails', 'Community Support'],
    buttonText: 'Get Started Free',
    isPopular: false
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/mo',
    desc: 'For startups scaling AI into production.',
    features: ['Up to 10 AI Agents', '50,000 Executions / mo', 'Advanced Policy Engine', 'Real-time Trace Explorer', 'Email Support'],
    buttonText: 'Start Free Trial',
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Full security and compliance for large organizations.',
    features: ['Unlimited Agents & Executions', 'Red Team Simulations', 'On-Premise Deployment', 'Dedicated Success Manager', '24/7 SLA Support'],
    buttonText: 'Contact Sales',
    isPopular: false
  }
];

export const Pricing = () => {
  return (
    <PublicLayout>
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Choose the plan that fits your security needs. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`relative glass-card rounded-3xl p-8 border ${plan.isPopular ? 'border-primary shadow-[0_0_40px_rgba(170,59,255,0.2)] transform md:-translate-y-4' : 'border-white/5'} animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-cyan-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full flex items-center gap-1 shadow-lg">
                    <Zap size={12} fill="currentColor" /> Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
                
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
                </div>
                
                <Link to="/signup" className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${plan.isPopular ? 'btn-primary text-white' : 'btn-secondary text-white'} mb-8`}>
                  {plan.buttonText}
                </Link>
                
                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Includes</p>
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-primary/20 p-0.5 text-primary flex-shrink-0">
                        <Check size={12} />
                      </div>
                      <span className="text-sm text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
