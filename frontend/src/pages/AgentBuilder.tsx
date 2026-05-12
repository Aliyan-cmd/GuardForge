// src/pages/AgentBuilder.tsx
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Cpu, Shield, Zap, Wrench, 
  Settings, Key, BarChart3, 
  Clock, DollarSign, ListChecks
} from 'lucide-react';

export const AgentBuilder = () => {
  const [activeTab, setActiveTab] = useState('config');

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto animate-fade-in">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(170,59,255,0.1)]">
            <Cpu className="text-primary" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">Agent <span className="text-primary">Architect</span></h2>
            <p className="text-gray-500">Configure core identity, capabilities, and safety boundaries.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="bg-white/5 border-white/10">Simulate Agent</Button>
          <Button className="shadow-[0_0_20px_rgba(170,59,255,0.3)]">Deploy to Cluster</Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit border border-white/5">
        <TabBtn active={activeTab === 'config'} onClick={() => setActiveTab('config')} icon={<Settings size={14}/>} label="Configuration" />
        <TabBtn active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<Wrench size={14}/>} label="Tools & Data" />
        <TabBtn active={activeTab === 'safety'} onClick={() => setActiveTab('safety')} icon={<Shield size={14}/>} label="Safety & Policies" />
        <TabBtn active={activeTab === 'limits'} onClick={() => setActiveTab('limits')} icon={<DollarSign size={14}/>} label="Resource Limits" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'config' && (
            <Card title="Agent Identity">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="label">Agent Name</label>
                    <input type="text" placeholder="e.g. Finance-Analyzer-01" className="input" />
                  </div>
                  <div>
                    <label className="label">Model Provider</label>
                    <select className="input bg-[#16171d]">
                      <option>OpenAI GPT-4o</option>
                      <option>Anthropic Claude 3.5 Sonnet</option>
                      <option>Meta Llama 3 (70B)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">System Instructions / Persona</label>
                  <textarea rows={6} className="input resize-none" placeholder="Explain the agent's core purpose and behavior..."></textarea>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'tools' && (
            <Card title="Tools & Capabilities">
              <div className="grid grid-cols-2 gap-4">
                <ToolToggle icon={<Search size={16}/>} label="Web Search" desc="Allows the agent to search the live web." active />
                <ToolToggle icon={<ListChecks size={16}/>} label="Database Query" desc="Read access to approved SQL schemas." />
                <ToolToggle icon={<Zap size={16}/>} label="Python Interpreter" desc="Execute sandboxed code for math/logic." active />
                <ToolToggle icon={<Key size={16}/>} label="Secret Management" desc="Securely retrieve API keys from Vault." />
              </div>
            </Card>
          )}

          {activeTab === 'safety' && (
            <Card title="Guardrails & Compliance">
               <div className="space-y-4">
                <p className="text-xs text-gray-500 mb-4">Select policies that this agent must strictly adhere to during execution.</p>
                <PolicySelector label="PII Data Redaction" active />
                <PolicySelector label="Internal Knowledge Only" active />
                <PolicySelector label="Bias & Toxicity Filter" active />
                <PolicySelector label="Financial Advice Restrictions" />
              </div>
            </Card>
          )}

          {activeTab === 'limits' && (
            <Card title="Governance Limits">
               <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="label">Max Steps per Execution</label>
                    <input type="range" min="1" max="50" defaultValue="15" className="w-full accent-primary" />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-bold uppercase"><span>1 step</span><span>50 steps</span></div>
                  </div>
                  <div>
                    <label className="label">Budget Cap ($/Month)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14}/>
                      <input type="number" defaultValue="500" className="input pl-8" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Clock size={16} className="text-primary"/> Estimated Performance</h4>
                  <p className="text-xs text-gray-500 mb-4">Based on selected model and instructions.</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs"><span>Avg Latency</span><span className="text-white font-bold">~850ms</span></div>
                    <div className="flex justify-between text-xs"><span>Success Rate</span><span className="text-white font-bold">94%</span></div>
                    <div className="flex justify-between text-xs"><span>Token Efficiency</span><span className="text-white font-bold">High</span></div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <aside className="space-y-6">
          <Card title="Agent Preview">
             <div className="bg-[#16171d] rounded-2xl p-6 border border-white/5 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center border-2 border-primary/40 animate-pulse">
                  <Cpu className="text-primary" size={40} />
                </div>
                <h3 className="text-xl font-black text-white">Ghost-Protocol</h3>
                <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest font-black">Security Specialist</p>
                <div className="flex justify-around border-t border-white/5 pt-6">
                  <div><p className="text-lg font-black">12</p><p className="text-[10px] text-gray-500 uppercase">Tools</p></div>
                  <div><p className="text-lg font-black">4</p><p className="text-[10px] text-gray-500 uppercase">Policies</p></div>
                  <div><p className="text-lg font-black">1.2s</p><p className="text-[10px] text-gray-500 uppercase">Lat</p></div>
                </div>
             </div>
          </Card>
          
          <Card title="Health Summary">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Current Status</span>
                <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-black uppercase">Active</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%]"></div>
              </div>
              <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest">Health Score: 85%</p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

const TabBtn = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${active ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
  >
    {icon}
    {label}
  </button>
);

const ToolToggle = ({ icon, label, desc, active }: any) => (
  <div className={`p-4 rounded-xl border transition-all cursor-pointer ${active ? 'bg-primary/5 border-primary/30' : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100'}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${active ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>
        {icon}
      </div>
      <p className="text-sm font-bold text-white">{label}</p>
    </div>
    <p className="text-[10px] text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const PolicySelector = ({ label, active }: any) => (
  <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
    <span className="text-xs font-bold text-white">{label}</span>
    <div className={`h-5 w-10 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-primary' : 'bg-gray-700'}`}>
      <div className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-all ${active ? 'right-1' : 'left-1'}`}></div>
    </div>
  </div>
);
