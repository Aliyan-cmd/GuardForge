// src/pages/IntegrationHub.tsx
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Database, 
  Globe, 
  Mail, 
  MessageSquare, 
  FileCode, 
  Plus, 
  Settings, 
  CheckCircle2, 
  Lock,
  Cloud
} from 'lucide-react';

export const IntegrationHub = () => {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Integration <span className="text-primary">Hub</span></h2>
          <p className="text-gray-500">Connect GuardForge to your enterprise stack securely.</p>
        </div>
        <Button className="flex gap-2 items-center">
          <Plus size={16} />
          New Integration
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard 
          icon={<Globe className="text-blue-400" />} 
          name="Web Browsing" 
          status="Connected" 
          desc="Enable agents to search the internet for real-time information." 
          type="Tool"
        />
        <IntegrationCard 
          icon={<Database className="text-purple-400" />} 
          name="SQL Database" 
          status="Connected" 
          desc="Read-only access to customer transaction schemas." 
          type="Data"
        />
        <IntegrationCard 
          icon={<MessageSquare className="text-[#4A154B]" />} 
          name="Slack Notifications" 
          status="Inactive" 
          desc="Send security alerts and policy violations to #security-alerts." 
          type="Alerting"
        />
        <IntegrationCard 
          icon={<FileCode className="text-white" />} 
          name="GitHub Enterprise" 
          status="Connected" 
          desc="Audit policy changes and version control for guardrails." 
          type="Compliance"
        />
        <IntegrationCard 
          icon={<Cloud className="text-blue-500" />} 
          name="AWS Secrets Manager" 
          status="Connected" 
          desc="Securely retrieve API keys and credentials for tool calls." 
          type="Security"
        />
        <div className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 opacity-40 hover:opacity-100 transition-all cursor-pointer hover:border-primary/50">
          <Plus size={32} className="text-gray-500 mb-2" />
          <p className="text-sm font-bold text-gray-500">Request Integration</p>
        </div>
      </div>

      <Card title="Secure API Management">
        <div className="space-y-4">
          <p className="text-xs text-gray-500">Manage your GuardForge API keys for external access. Always use scoped keys for production environments.</p>
          <div className="space-y-3">
            <ApiKeyItem label="Production Read-Only" keyStr="gf_live_********92" date="2024-05-10" />
            <ApiKeyItem label="Dev Test Cluster" keyStr="gf_test_********41" date="2024-05-12" />
          </div>
          <div className="pt-4 flex justify-end">
            <Button variant="secondary" className="text-xs bg-white/5 border-white/10">Rotate All Keys</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const IntegrationCard = ({ icon, name, status, desc, type }: any) => (
  <Card className="hover:border-primary/30 transition-all group relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-1 text-[8px] font-black uppercase tracking-tighter px-3 rounded-bl-xl ${status === 'Connected' ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
      {status}
    </div>
    <div className="flex items-start gap-4 mb-4">
      <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary/10 transition-colors">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{name}</h4>
        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{type}</p>
      </div>
    </div>
    <p className="text-xs text-gray-500 leading-relaxed mb-6">{desc}</p>
    <div className="flex gap-2">
      <Button variant="secondary" className="flex-1 py-1.5 text-[10px] bg-white/5 border-white/5">Settings</Button>
      <Button variant="secondary" className="flex-1 py-1.5 text-[10px] bg-white/5 border-white/5">View Logs</Button>
    </div>
  </Card>
);

const ApiKeyItem = ({ label, keyStr, date }: any) => (
  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
    <div className="flex items-center gap-4">
      <Lock size={16} className="text-primary" />
      <div>
        <p className="text-xs font-bold text-white">{label}</p>
        <p className="text-[10px] text-gray-500">Created: {date}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <code className="text-[10px] bg-black/40 px-3 py-1 rounded font-mono text-gray-400">{keyStr}</code>
      <button className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline">Revoke</button>
    </div>
  </div>
);
