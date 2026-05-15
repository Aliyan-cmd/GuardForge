import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Activity, Eye, Cpu, Zap, Lock, BarChart3,
  ArrowRight, CheckCircle, Play, ChevronRight, Star,
  Globe, Users, FileText, AlertTriangle, Layers, Sparkles
} from 'lucide-react';

/* ── animated counter ── */
const Counter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = end / 60;
      const id = setInterval(() => {
        start += step;
        if (start >= end) { setVal(end); clearInterval(id); }
        else setVal(Math.floor(start));
      }, 16);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <div ref={ref} className="stat-number">{val.toLocaleString()}{suffix}</div>;
};

/* ── nav ── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-blur' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center animate-pulse-glow">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">Guard<span className="text-gradient">Forge</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          {['Features','How it Works','Pricing','Docs'].map(t => (
            <a key={t} href={`#${t.toLowerCase().replace(' ','-')}`}
              className="hover:text-white transition-colors duration-200 relative group">
              {t}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-secondary px-5 py-2 rounded-xl text-sm font-semibold text-white">Sign In</Link>
          <Link to="/signup" className="btn-primary px-5 py-2 rounded-xl text-sm font-bold text-white">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

/* ── hero ── */
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg grid-bg pt-24">
    {/* orbs */}
    <div className="orb orb-purple w-[700px] h-[700px] -top-40 -left-40 opacity-60" />
    <div className="orb orb-cyan w-[500px] h-[500px] bottom-0 right-0 opacity-40" />
    <div className="orb orb-blue w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

    <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
      {/* badge */}
      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-xs font-bold text-primary mb-8 animate-fade-in">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        Enterprise AI Governance Platform
        <ChevronRight size={12} />
      </div>

      <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[1.05] mb-6 animate-fade-in delay-100 hero-text-glow">
        Govern Your AI.<br />
        <span className="text-gradient">At Enterprise Scale.</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in delay-200">
        GuardForge is the unified control plane for enterprise AI agents — monitor decisions in real-time, enforce safety policies, detect threats, and stay compliant. All in one stunning dashboard.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
        <Link to="/signup"
          className="btn-primary px-8 py-4 rounded-2xl text-base font-bold text-white flex items-center gap-2 group">
          Start for Free
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a href="#features"
          className="btn-secondary px-8 py-4 rounded-2xl text-base font-semibold text-white flex items-center gap-2 group">
          <Play size={16} className="text-primary" />
          See How It Works
        </a>
      </div>

      {/* trust bar */}
      <div className="flex items-center justify-center gap-6 mt-12 animate-fade-in delay-500">
        {['SOC 2 Ready','GDPR Compliant','Zero Data Retention'].map(t => (
          <div key={t} className="flex items-center gap-1.5 text-xs text-gray-500">
            <CheckCircle size={12} className="text-green-500" />
            {t}
          </div>
        ))}
      </div>

      {/* dashboard preview */}
      <div className="mt-20 relative animate-fade-in-up delay-400">
        <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-transparent to-transparent rounded-3xl blur-2xl" />
        <div className="relative glass-card rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
          <div className="bg-[#0e0b1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
            <div className="flex gap-1.5"><div className="dot dot-red"/><div className="dot dot-yellow"/><div className="dot dot-green"/></div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/5 rounded-md px-4 py-1 text-[10px] text-gray-500">app.guardforge.ai/dashboard</div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-4 gap-4">
            {[
              { label:'Global Risk Score', val:'12', icon:<Shield size={20}/>, color:'text-green-400', bg:'bg-green-500/10' },
              { label:'Active Agents', val:'47', icon:<Cpu size={20}/>, color:'text-primary', bg:'bg-primary/10' },
              { label:'Executions Today', val:'2,841', icon:<Activity size={20}/>, color:'text-blue-400', bg:'bg-blue-500/10' },
              { label:'Threats Blocked', val:'139', icon:<AlertTriangle size={20}/>, color:'text-orange-400', bg:'bg-orange-500/10' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className={`h-8 w-8 ${s.bg} rounded-lg flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
                <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
            <div className="col-span-4 bg-white/5 rounded-xl p-4 border border-white/5 h-32 flex items-center justify-center">
              <div className="flex items-end gap-1 h-16">
                {[30,55,40,70,45,85,60,90,50,75,88,65].map((h,i) => (
                  <div key={i} className="w-5 rounded-t bg-primary/60 hover:bg-primary transition-colors"
                    style={{ height:`${h}%`, animationDelay:`${i*80}ms` }} />
                ))}
              </div>
              <div className="ml-6 text-left">
                <p className="text-xs text-gray-400 font-semibold">Execution Trend (7d)</p>
                <p className="text-2xl font-black text-white">↑ 24%</p>
                <p className="text-[10px] text-green-400">All systems nominal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── stats ── */
const Stats = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="section-divider mb-24" />
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { end:50000, suffix:'+', label:'AI Executions Monitored', color:'text-primary' },
          { end:99, suffix:'%', label:'Threat Detection Rate', color:'text-green-400' },
          { end:200, suffix:'+', label:'Enterprise Integrations', color:'text-cyan-400' },
          { end:10, suffix:'ms', label:'Real-time Trace Latency', color:'text-orange-400' },
        ].map(s => (
          <div key={s.label} className="text-center group">
            <div className={`text-5xl md:text-6xl font-black ${s.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <p className="text-sm text-gray-500 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="section-divider mt-24" />
  </section>
);

/* ── features ── */
const features = [
  { icon:<Eye size={28}/>, title:'Real-Time Trace Explorer', desc:'Watch every AI decision unfold token by token. Live WebSocket streaming shows you exactly what your agents are thinking — no black boxes.', color:'text-primary', bg:'bg-primary/10', border:'border-primary/20', tag:'Live' },
  { icon:<Shield size={28}/>, title:'AI Policy Engine', desc:'Generate and enforce governance policies automatically. Define rules in plain language; GuardForge converts them to enforceable guardrails instantly.', color:'text-green-400', bg:'bg-green-500/10', border:'border-green-500/20', tag:'AI-Powered' },
  { icon:<AlertTriangle size={28}/>, title:'Red Team Simulations', desc:'Continuously probe your AI agents with adversarial attacks. Detect prompt injection, jailbreak attempts, and PII leakage before they reach production.', color:'text-red-400', bg:'bg-red-500/10', border:'border-red-500/20', tag:'Security' },
  { icon:<BarChart3 size={28}/>, title:'Governance Dashboard', desc:'A unified command center with predictive risk scoring, policy violation trends, and anomaly detection — all backed by real-time data.', color:'text-blue-400', bg:'bg-blue-500/10', border:'border-blue-500/20', tag:'Analytics' },
  { icon:<Cpu size={28}/>, title:'Agent Health Monitor', desc:'Track latency, throughput, error rates, and health scores for every agent in your fleet. Get alerted before degradation becomes an outage.', color:'text-yellow-400', bg:'bg-yellow-500/10', border:'border-yellow-500/20', tag:'Observability' },
  { icon:<FileText size={28}/>, title:'Compliance Reports', desc:'One-click PDF compliance reports for SOC 2, GDPR, and custom frameworks. Audit-ready documentation generated from live agent data.', color:'text-cyan-400', bg:'bg-cyan-500/10', border:'border-cyan-500/20', tag:'Compliance' },
  { icon:<Layers size={28}/>, title:'Workflow Designer', desc:'Build multi-agent pipelines visually. Chain agents, define fallbacks, and see execution flows traced step-by-step in real time.', color:'text-purple-400', bg:'bg-purple-500/10', border:'border-purple-500/20', tag:'Builder' },
  { icon:<Globe size={28}/>, title:'Integration Hub', desc:'Connect to OpenAI, Anthropic, LangChain, HuggingFace, and your custom APIs. 200+ pre-built connectors ready out of the box.', color:'text-indigo-400', bg:'bg-indigo-500/10', border:'border-indigo-500/20', tag:'Integrations' },
  { icon:<Users size={28}/>, title:'Swarm Intelligence', desc:'Coordinate and govern multi-agent swarms. Monitor emergent behaviors, detect coordination failures, and enforce group-level policies.', color:'text-pink-400', bg:'bg-pink-500/10', border:'border-pink-500/20', tag:'Advanced' },
];

const Features = () => (
  <section id="features" className="py-32 relative overflow-hidden">
    <div className="orb orb-purple w-96 h-96 top-1/2 -right-40 opacity-20" />
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold text-primary mb-6">
          <Sparkles size={12} /> Everything You Need
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Built for the AI<br /><span className="text-gradient">Governance Era</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Nine powerful modules. One unified platform. Everything your team needs to ship AI safely.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={f.title}
            className={`relative feature-card glass-card rounded-2xl p-6 border ${f.border} overflow-hidden`}
            style={{ animationDelay: `${i * 60}ms` }}>
            {/* tag */}
            <span className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${f.bg} ${f.color} border ${f.border}`}>{f.tag}</span>
            <div className={`h-14 w-14 ${f.bg} rounded-2xl flex items-center justify-center ${f.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
              {f.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            <div className={`mt-4 flex items-center gap-1.5 text-xs font-bold ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Learn more <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── how it works ── */
const HowItWorks = () => (
  <section id="how-it-works" className="py-32 relative overflow-hidden">
    <div className="section-divider mb-32" />
    <div className="orb orb-cyan w-96 h-96 top-0 -left-40 opacity-20" />
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Up in <span className="text-gradient">5 Minutes</span></h2>
        <p className="text-gray-400 text-lg">No complex setup. No agents to babysit. Just connect and govern.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { step:'01', title:'Connect Your Agents', desc:'Point GuardForge at your existing AI agents via API. Supports LangChain, OpenAI Assistants, custom models — any HTTP endpoint.', icon:<Zap size={24}/> },
          { step:'02', title:'Define Your Policies', desc:'Use our AI policy generator or write rules yourself. Set risk thresholds, PII filters, output validators, and approval gates.', icon:<Lock size={24}/> },
          { step:'03', title:'Monitor & Enforce', desc:'Watch every execution live. Violations are flagged, logged, and blocked automatically. Get alerts before issues reach your users.', icon:<Activity size={24}/> },
        ].map((s, i) => (
          <div key={s.step} className="relative group">
            {i < 2 && (
              <div className="hidden md:block absolute top-12 left-full w-full h-px z-10"
                style={{ background:'linear-gradient(90deg, rgba(170,59,255,0.4), transparent)' }} />
            )}
            <div className="glass-card rounded-2xl p-8 border border-white/5 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 text-8xl font-black text-white/[0.03] leading-none select-none">{s.step}</div>
              <div className="h-12 w-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="section-divider mt-32" />
  </section>
);

/* ── testimonials ── */
const testimonials = [
  { name:'Sarah Chen', role:'CTO at FinanceAI Corp', text:'GuardForge gave us the visibility we needed to ship our AI products confidently. The real-time trace explorer is simply unmatched.', stars:5 },
  { name:'Marcus Webb', role:'Head of AI Safety, TechUnicorn', text:'We caught a critical prompt injection vulnerability in our customer-facing agent before it caused damage. GuardForge paid for itself on day one.', stars:5 },
  { name:'Dr. Priya Nair', role:'AI Compliance Lead, BankCorp', text:'Audit reports that used to take us 3 days now take 30 seconds. Our compliance team is obsessed with this product.', stars:5 },
];

const Testimonials = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Trusted by <span className="text-gradient">AI Teams</span></h2>
        <p className="text-gray-400">Join hundreds of enterprises governing AI safely with GuardForge.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={t.name} className="glass-card rounded-2xl p-6 border border-white/5"
            style={{ animationDelay:`${i*100}ms` }}>
            <div className="flex mb-4">
              {Array.from({ length: t.stars }).map((_, s) => (
                <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white text-xs font-black">
                {t.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-[11px] text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── CTA ── */
const CTA = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="section-divider mb-32" />
    <div className="orb orb-purple w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
    <div className="relative max-w-4xl mx-auto px-6 text-center">
      <div className="glass-card border-gradient rounded-3xl p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
        <div className="relative">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 animate-pulse-glow">
            <Shield size={32} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Govern<br /><span className="text-gradient">Your AI Fleet?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">Start free. No credit card required. Up and running in under 5 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup"
              className="btn-primary px-10 py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-2 group">
              Create Free Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login"
              className="btn-secondary px-10 py-4 rounded-2xl text-base font-semibold text-white">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── footer ── */
const Footer = () => (
  <footer className="border-t border-white/5 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <span className="font-black text-white">Guard<span className="text-primary">Forge</span></span>
        </div>
        <p className="text-xs text-gray-600">© 2026 GuardForge. Enterprise AI Governance Platform. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-gray-600">
          {['Privacy','Terms','Security','Docs'].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ── main export ── */
export const Landing = () => (
  <div className="mesh-bg min-h-screen text-white">
    <Navbar />
    <Hero />
    <Stats />
    <Features />
    <HowItWorks />
    <Testimonials />
    <CTA />
    <Footer />
  </div>
);
