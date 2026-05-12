// src/pages/AgentHealth.tsx
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Heart, 
  ShieldCheck, 
  Activity, 
  Target, 
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { subject: 'Security', A: 85, fullMark: 100 },
  { subject: 'Reliability', A: 98, fullMark: 100 },
  { subject: 'Performance', A: 70, fullMark: 100 },
  { subject: 'Compliance', A: 100, fullMark: 100 },
  { subject: 'Efficiency', A: 65, fullMark: 100 },
];

export const AgentHealth = () => {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto animate-fade-in">
       <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white">Agent <span className="text-primary">Health & Recommendations</span></h2>
          <p className="text-gray-500">AI-driven assessment of agent behavior, security posture, and performance optimization.</p>
        </div>
        <Button variant="secondary" className="bg-white/5 border-white/10">Refresh Assessment</Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Card */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center py-12 relative overflow-hidden border-primary/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4">Overall Health Index</p>
          <div className="relative h-48 w-48 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90">
              <circle cx="96" cy="96" r="80" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle cx="96" cy="96" r="80" fill="transparent" stroke="#aa3bff" strokeWidth="12" strokeDasharray="502.4" strokeDashoffset="80" strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <span className="text-6xl font-black">84</span>
              <p className="text-[10px] text-primary font-bold uppercase">Optimal</p>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
             <div className="flex items-center gap-1 text-green-400 text-xs font-bold"><ArrowUpRight size={14}/> +4% vs last week</div>
          </div>
        </Card>

        {/* Radar Chart Analysis */}
        <Card title="Score Breakdown" className="lg:col-span-2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b6375', fontSize: 10, fontWeight: 'bold' }} />
              <Radar
                name="Agent Performance"
                dataKey="A"
                stroke="#aa3bff"
                fill="#aa3bff"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Individual Metrics */}
        <div className="space-y-4">
          <MetricCard icon={<ShieldCheck className="text-green-400" size={16}/>} label="Security Posture" value="85/100" status="Excellent" />
          <MetricCard icon={<Activity className="text-blue-400" size={16}/>} label="Operational Reliability" value="98/100" status="Stable" />
          <MetricCard icon={<Target className="text-yellow-400" size={16}/>} label="Instruction Adherence" value="72/100" status="Improving" />
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-2">
          <Card title="AI Optimization Engine">
             <div className="space-y-4">
              <RecommendationItem 
                icon={<Lightbulb className="text-primary" size={18}/>}
                title="Optimize Token Usage"
                desc="Agent 'Customer-Support-V4' has shown a 15% increase in redundant tokens. Suggesting instruction compression."
                action="Compress Persona"
              />
              <RecommendationItem 
                icon={<AlertTriangle className="text-yellow-400" size={18}/>}
                title="Security Hardening"
                desc="Frequent attempts to bypass 'Internal Knowledge' policy detected. Consider switching to more restrictive GPT-4o-mini."
                action="Review Guardrails"
              />
              <RecommendationItem 
                icon={<TrendingDown className="text-red-400" size={18}/>}
                title="Drift Warning"
                desc="Semantic drift detected in response tone. Confidence score dropped by 0.12 in last 50 runs."
                action="Retune Instruction"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, status }: any) => (
  <Card className="flex items-center justify-between border-white/5 hover:border-white/10 transition-all cursor-default">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">{icon}</div>
      <div>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-white">{value}</p>
      </div>
    </div>
    <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-full font-bold">{status}</span>
  </Card>
);

const RecommendationItem = ({ icon, title, desc, action }: any) => (
  <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">{icon}</div>
    <div className="flex-1">
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">{desc}</p>
      <button className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline">{action} →</button>
    </div>
  </div>
);
