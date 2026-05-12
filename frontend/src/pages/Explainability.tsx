// src/pages/Explainability.tsx
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Info, Brain, Target, ShieldCheck, Download } from 'lucide-react';

export const Explainability = () => {
  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white italic">Reasoning <span className="text-primary">Explainability</span></h2>
          <p className="text-gray-500">Deep-dive into AI decision-making processes and source attribution.</p>
        </div>
        <Button className="flex gap-2 items-center">
          <Download size={16} />
          Export Analysis
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Chain of Thought */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Chain-of-Thought (CoT)">
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-8 before:bottom-8 before:w-[2px] before:bg-white/5">
              <Step 
                num="1" 
                title="Input Parsing" 
                desc="Detected user intent: 'Process refund for order #1234'. Extracted order ID and intent successfully." 
                icon={<Info className="text-blue-400" size={14}/>}
              />
              <Step 
                num="2" 
                title="Knowledge Retrieval" 
                desc="Queried internal knowledge base. Found refund policy: 'Orders within 30 days are eligible'. Verified order #1234 is 12 days old." 
                icon={<Target className="text-primary" size={14}/>}
              />
              <Step 
                num="3" 
                title="Guardrail Assessment" 
                desc="Checked response for PII and toxicity. No violations found. Verified user has 'Customer' role via token." 
                icon={<ShieldCheck className="text-green-400" size={14}/>}
              />
              <Step 
                num="4" 
                title="Response Generation" 
                desc="Formulated final output confirming refund eligibility and providing next steps." 
                icon={<Brain className="text-purple-400" size={14}/>}
              />
            </div>
          </Card>

          <Card title="Source Attribution (RAG)">
             <div className="space-y-3">
              <SourceItem 
                title="Refund_Policy_2024.pdf" 
                relevance={98} 
                snippet="Customers are entitled to a full refund if the request is made within 30 calendar days of delivery..."
              />
              <SourceItem 
                title="Customer_FAQ.md" 
                relevance={82} 
                snippet="To initiate a refund, the customer must provide the order number and reason for return..."
              />
            </div>
          </Card>
        </div>

        {/* Right Column: Metrics */}
        <aside className="space-y-6">
          <Card title="Confidence Metrics">
            <div className="space-y-6">
              <MetricCircle label="Faithfulness" value={94} color="text-green-400" />
              <MetricCircle label="Compliance" value={100} color="text-blue-400" />
              <MetricCircle label="Certainty" value={88} color="text-primary" />
            </div>
          </Card>

          <Card title="Execution Metadata">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Model</span><span className="text-white font-bold">GPT-4o (2024-05-13)</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Latency</span><span className="text-white font-bold">1,842ms</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Prompt Tokens</span><span className="text-white font-bold">1,240</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Completion Tokens</span><span className="text-white font-bold">312</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Total Cost</span><span className="text-white font-bold">$0.0042</span></div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

const Step = ({ num, title, desc, icon }: { num: string, title: string, desc: string, icon: React.ReactNode }) => (
  <div className="flex gap-6 relative z-10">
    <div className="h-10 w-10 rounded-full bg-[#16171d] border border-white/10 flex items-center justify-center shrink-0 shadow-xl font-black text-xs text-primary">
      {num}
    </div>
    <div className="pt-1">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h4 className="text-sm font-bold text-white">{title}</h4>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const SourceItem = ({ title, relevance, snippet }: { title: string, relevance: number, snippet: string }) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 transition-all group">
    <div className="flex justify-between items-center mb-2">
      <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">{title}</p>
      <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">{relevance}% Match</span>
    </div>
    <p className="text-[10px] text-gray-500 italic">"...{snippet}..."</p>
  </div>
);

const MetricCircle = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div>
    <div className="flex justify-between items-end mb-2">
      <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest">{label}</span>
      <span className={`text-sm font-black ${color}`}>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full bg-current ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);
