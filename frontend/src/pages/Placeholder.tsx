
import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Card } from '../components/Card';
import { Cpu, Activity, Shield, Layers } from 'lucide-react';

export const Agents = () => {
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    api.get('/agents').then(res => setAgents(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black text-white">Agent <span className="text-primary">Management</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <Card key={agent.id} className="border-white/5 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{agent.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  <span className="text-xs text-gray-500 uppercase font-black tracking-widest">{agent.status}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Workflows = () => {
  const [workflows, setWorkflows] = useState<any[]>([]);

  useEffect(() => {
    api.get('/workflows').then(res => setWorkflows(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black text-white">AI <span className="text-primary">Workflows</span></h1>
      <div className="space-y-4">
        {workflows.map(wf => (
          <Card key={wf.id} className="flex items-center justify-between border-white/5 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-white">{wf.name}</h3>
            </div>
            <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Edit Flow</button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Policies = () => {
  const [policies, setPolicies] = useState<any[]>([]);

  useEffect(() => {
    api.get('/policies').then(res => setPolicies(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black text-white">Governance <span className="text-primary">Policies</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map(p => (
          <Card key={p.id} className="border-white/5">
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-white">{p.name}</h3>
                <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{p.status}</span>
             </div>
             <p className="text-xs text-gray-500 mb-4">Ensures compliance with {p.name} standards across all agents.</p>
             <div className="flex gap-2">
                <Shield size={14} className="text-primary" />
                <span className="text-[10px] text-gray-400 font-bold">Enforced on 3 Agents</span>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Approvals = () => {
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    api.get('/approvals/pending').then(res => setApprovals(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-black text-white">Pending <span className="text-primary">Approvals</span></h1>
      <div className="space-y-4">
        {approvals.map(a => (
          <Card key={a.id} className="border-red-500/10 bg-red-500/[0.02]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{a.reason}</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{a.created_at}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-1.5 rounded-lg border border-white/10 text-xs font-bold hover:bg-white/5 transition-all">Deny</button>
                <button className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(170,59,255,0.4)] transition-all">Approve</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const RedTeam = () => (
  <div className="p-8">
    <h1 className="text-3xl font-black text-white mb-8">Red-Team <span className="text-primary">Simulations</span></h1>
    <Card className="p-12 text-center border-dashed border-white/10">
      <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Shield size={40} className="text-primary" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Simulated Attacks in Progress</h3>
      <p className="text-gray-500 text-sm max-w-md mx-auto">Our red-team agents are currently probing your defenses. Results will be available in the Audit Log once simulations conclude.</p>
    </Card>
  </div>
);

export const Audit = () => <div className="p-8 text-white">See Audit Log section in sidebar.</div>;
