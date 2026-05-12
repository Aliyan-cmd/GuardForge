// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AlertBell } from '../components/AlertBell';
import { useWebSocket } from '../hooks/useWebSocket';
import { TraceViewer } from '../components/TraceViewer';
import { useAuth } from '../context/AuthContext';
import type { WSMessage } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Activity, Shield, AlertTriangle, Cpu, CheckCircle, Search, Sparkles } from 'lucide-react';

const COLORS = ['#aa3bff', '#c084fc', '#4f46e5', '#3b82f6'];

export const Dashboard = () => {
  const [stats, setStats] = useState<any>({ execution_trends: [], policy_violations: [], risk_distribution: [] });
  const [traceMessages, setTraceMessages] = useState<any[]>([]);
  const [activeRunId, setActiveRunId] = useState<string>('');
  const { lastMessage } = useWebSocket(activeRunId);
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/dashboard/overview');
        setStats((prev: any) => ({ ...prev, ...res.data }));
      } catch (err) {
        console.error("Stats fetch failed", err);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (lastMessage) setTraceMessages((prev) => [lastMessage, ...prev]);
  }, [lastMessage]);

  const runDemoWorkflow = async () => {
    try {
      const res = await api.post('/workflows/run/1');
      setActiveRunId(res.data.run_id);
      setTraceMessages([]); 
    } catch (err) {
      alert("Failed to start workflow");
    }
  };

  const downloadComplianceReport = async () => {
    try {
      const response = await api.get('/reports/compliance/1', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'compliance_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to generate report");
    }
  };

  const seedDemo = async () => {
    try {
      await api.post('/dashboard/seed-demo');
      alert("Demo Mode Activated! Platform seeded with enterprise data.");
      window.location.reload();
    } catch (err) {
      alert("Demo seeding failed");
    }
  };

  return (
    <div className="min-h-full">
      <main className="p-6 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">System Operational</p>
            </div>
            <h2 className="text-4xl font-black mb-1 tracking-tight">Governance <span className="text-primary">Intelligence</span></h2>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={seedDemo} className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20">🚀 One-Click Demo Mode</Button>
            <Button variant="secondary" onClick={downloadComplianceReport} className="bg-white/5 border-white/10">Download Compliance Report</Button>
            <Button onClick={runDemoWorkflow} className="shadow-[0_0_20px_rgba(170,59,255,0.3)]">Launch Security Scan</Button>
          </div>
        </header>

        {/* Analytics Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Risk Card */}
          <Card className="lg:col-span-1 flex flex-col justify-between overflow-hidden relative border-primary/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield size={80} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">Global Risk Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black">{stats.risk_score ?? '0'}</span>
                <span className="text-gray-500 font-bold">/ 100</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary" style={{ width: `${stats.risk_score}%` }}></div>
              </div>
              <p className="text-xs text-gray-400 font-medium">Low Risk – System within bounds</p>
            </div>
          </Card>

          {/* Execution Trends Chart */}
          <Card title="Execution Trends (7 Days)" className="lg:col-span-2 h-[300px]">
            {stats.execution_trends?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.execution_trends}>
                <defs>
                  <linearGradient id="colorExec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#aa3bff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#aa3bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#6b6375" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b6375" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16171d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="executions" stroke="#aa3bff" fillOpacity={1} fill="url(#colorExec)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-xs italic">Loading trend data...</div>
            )}
          </Card>

          {/* Risk Distribution Pie */}
          <Card title="Risk Distribution" className="lg:col-span-1 h-[300px]">
             {stats.risk_distribution?.length > 0 ? (
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.risk_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.risk_distribution?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16171d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-xs italic">Awaiting distribution...</div>
            )}
          </Card>
        </div>

        {/* Predictive Forecasting Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Predictive Risk Forecasting (Next 7 Days)" className="lg:col-span-2 h-[250px] border-primary/10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Mon', risk: 24, forecast: 24 },
                { name: 'Tue', risk: 28, forecast: 28 },
                { name: 'Wed', risk: 32, forecast: 32 },
                { name: 'Thu', risk: 30, forecast: 30 },
                { name: 'Fri', forecast: 35 },
                { name: 'Sat', forecast: 42 },
                { name: 'Sun', forecast: 38 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b6375" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b6375" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16171d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="risk" stroke="#aa3bff" strokeWidth={3} dot={{ fill: '#aa3bff' }} />
                <Line type="monotone" dataKey="forecast" stroke="#aa3bff" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          
          <Card className="flex flex-col justify-center bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-primary" size={20} />
              <h4 className="text-sm font-bold text-white">AI Forecast Insight</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Risk is predicted to increase by <span className="text-red-400 font-bold">12%</span> this weekend due to projected high traffic and increased adversarial probe frequency. Suggesting pre-emptive hardening of 'Customer-Alpha'.
            </p>
          </Card>
        </div>

        {/* Second Row: Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MiniStat icon={<Cpu className="text-primary" size={16}/>} label="Agents" value={stats.total_agents} />
          <MiniStat icon={<Activity className="text-green-400" size={16}/>} label="Workflows" value={stats.active_workflows} />
          <MiniStat icon={<CheckCircle className="text-blue-400" size={16}/>} label="Executions" value={stats.executions_today} />
          <MiniStat icon={<AlertTriangle className="text-red-400" size={16}/>} label="Violations" value={stats.violations_today} />
          <MiniStat icon={<Shield className="text-yellow-400" size={16}/>} label="Red-Tests" value={stats.redteam_tests} />
          <MiniStat icon={<Activity className="text-primary" size={16}/>} label="Uptime" value="99.9%" />
        </div>

        {/* Third Row: Trace & Top Violations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity size={20} className="text-primary" />
                Live Execution Trace
              </h3>
              {activeRunId && <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full animate-pulse font-black uppercase tracking-tighter border border-primary/30">Streaming: {activeRunId}</span>}
            </div>
            <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <TraceViewer messages={traceMessages} />
            </div>
          </section>

          <aside className="space-y-6">
            <Card title="Top Policy Violations">
              <div className="space-y-4">
                {stats.policy_violations?.map((v: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{v.name}</span>
                      <span className="font-bold">{v.count}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(v.count / (v.count || 20)) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="System Anomalies" className="border-red-500/20">
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                  <AlertTriangle className="text-red-500 shrink-0" size={16} />
                  <div>
                    <p className="text-sm font-bold text-red-200">Spike in Hallucinations</p>
                    <p className="text-xs text-red-500/70">Agent Alpha - Detected 12 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/10">
                  <Activity className="text-yellow-500 shrink-0" size={16} />
                  <div>
                    <p className="text-sm font-bold text-yellow-200">High Latency Detected</p>
                    <p className="text-xs text-yellow-500/70">Workflow "Customer Support" - 4.2s avg</p>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

const MiniStat = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: any }) => (
  <Card className="flex items-center gap-4 py-4 border-white/5 hover:border-primary/30 transition-all cursor-default">
    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{label}</p>
      <p className="text-xl font-black text-white">{value ?? '0'}</p>
    </div>
  </Card>
);

const QuickButton = ({ label }: { label: string }) => (
  <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-center transition-all text-sm font-medium">
    {label}
  </button>
);
