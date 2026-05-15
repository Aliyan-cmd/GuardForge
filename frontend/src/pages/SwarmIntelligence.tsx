// src/pages/SwarmIntelligence.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Users, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Bot,
  Loader2,
  Cpu,
  Share2
} from 'lucide-react';

const AGENTS = [
  { id: 'sec-1', name: 'Security Auditor', role: 'Vulnerability Scanning', color: 'text-red-400', bg: 'bg-red-400/10' },
  { id: 'risk-1', name: 'Risk Analyst', role: 'Impact Assessment', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'comp-1', name: 'Compliance Officer', role: 'Regulatory Checking', color: 'text-green-400', bg: 'bg-green-400/10' },
];

export const SwarmIntelligence = () => {
  const [activeTab, setActiveTab] = useState('orchestration');
  const [messages, setMessages] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const simulateSwarm = () => {
    setIsRunning(true);
    setMessages([]);
    const sequence = [
      { sender: 'Security Auditor', msg: 'System scan initiated. Found potential PII leak in customer-api-v2.', type: 'alert' },
      { sender: 'GuardForge', msg: 'Intercepted. Validating against Policy: "PII_PROTECTION_ACT".', type: 'system' },
      { sender: 'Risk Analyst', msg: 'PII leak confirmed. Calculating impact score... Result: 7.8 (High).', type: 'info' },
      { sender: 'Compliance Officer', msg: 'Drafting regulatory disclosure for GDPR Article 33 compliance.', type: 'info' },
      { sender: 'GuardForge', msg: 'Swarm handoff approved. All agents synchronized.', type: 'success' },
    ];

    sequence.forEach((s, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, s]);
        if (i === sequence.length - 1) setIsRunning(false);
      }, (i + 1) * 1500);
    });
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Multi-Agent <span className="text-primary">Swarm Intelligence</span></h2>
          <p className="text-gray-500">Monitor and govern collaborative AI agent swarms in real-time.</p>
        </div>
        <Button onClick={simulateSwarm} disabled={isRunning} className="flex gap-2 items-center">
          {isRunning ? <Loader2 className="animate-spin" size={16}/> : <Zap size={16} />}
          {isRunning ? 'Simulating Swarm...' : 'Trigger Swarm Handoff'}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Agent List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest px-2">Active Swarm Agents</h3>
          {AGENTS.map(agent => (
            <div key={agent.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 hover:border-primary/30 transition-all cursor-default group">
              <div className={`h-10 w-10 rounded-xl ${agent.bg} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                <Bot className={agent.color} size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{agent.name}</p>
                <p className="text-[10px] text-gray-500">{agent.role}</p>
              </div>
            </div>
          ))}
          <div className="p-4 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-all cursor-pointer hover:border-primary/50">
            <Share2 size={24} className="text-gray-500 mb-2" />
            <p className="text-[10px] font-black uppercase text-gray-500">Add Collaborative Agent</p>
          </div>
        </div>

        {/* Message Bus */}
        <div className="lg:col-span-3">
          <Card title="Handoff Logs & Governance Interception" className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {messages.length === 0 && !isRunning && (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <MessageSquare size={64} className="mb-4" />
                  <p className="text-sm font-bold italic text-center">No active swarm session.<br/>Click "Trigger Swarm Handoff" to simulate agent collaboration.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`animate-slide-up flex gap-4 p-4 rounded-2xl border ${
                  m.sender === 'GuardForge' ? 'bg-primary/5 border-primary/20' : 'bg-white/5 border-white/5'
                }`}>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    m.sender === 'GuardForge' ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'
                  }`}>
                    {m.sender === 'GuardForge' ? <ShieldCheck size={16}/> : <Bot size={16}/>}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className={`text-xs font-black uppercase tracking-tighter ${m.sender === 'GuardForge' ? 'text-primary' : 'text-white'}`}>
                        {m.sender}
                      </p>
                      <span className="text-[8px] text-gray-600 font-mono">STEP_0{i+1}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{m.msg}</p>
                  </div>
                </div>
              ))}
              {isRunning && (
                <div className="flex gap-4 p-4 items-center animate-pulse">
                  <Loader2 className="animate-spin text-primary" size={16} />
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Awaiting Handoff Approval...</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
              <div className="flex-1 h-10 bg-black/40 rounded-xl border border-white/5 px-4 flex items-center text-xs text-gray-500">
                Type manual intervention command...
              </div>
              <Button variant="secondary" className="bg-white/5 border-white/10">Abort Swarm</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
