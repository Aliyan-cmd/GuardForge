import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Cpu, AlertTriangle, ArrowRight, Play, ChevronRight } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';

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

/* ── hero ── */
const Hero = () => (
  <section className="relative flex items-center justify-center overflow-hidden py-12">
    <div className="orb orb-purple w-[700px] h-[700px] -top-40 -left-40 opacity-60" />
    <div className="orb orb-cyan w-[500px] h-[500px] bottom-0 right-0 opacity-40" />
    <div className="orb orb-blue w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

    <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
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
        GuardForge is the unified control plane for enterprise AI agents — monitor decisions in real-time, enforce safety policies, detect threats, and stay compliant.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
        <Link to="/signup"
          className="btn-primary px-8 py-4 rounded-2xl text-base font-bold text-white flex items-center gap-2 group">
          Start for Free
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/how-it-works"
          className="btn-secondary px-8 py-4 rounded-2xl text-base font-semibold text-white flex items-center gap-2 group">
          <Play size={16} className="text-primary" />
          See How It Works
        </Link>
      </div>

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
              <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                <div className={`h-8 w-8 ${s.bg} rounded-lg flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
                <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
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
  </section>
);

export const Landing = () => (
  <PublicLayout>
    <Hero />
    <Stats />
  </PublicLayout>
);
