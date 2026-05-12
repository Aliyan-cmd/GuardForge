// src/pages/RedTeam.tsx
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  ShieldAlert, 
  Zap, 
  Target, 
  Flame, 
  AlertTriangle,
  ChevronRight,
  Loader2,
  FileText
} from 'lucide-react';

export const RedTeam = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [report, setReport] = useState<any>(null);

  const startTest = () => {
    setIsTesting(true);
    setReport(null);
    setTimeout(() => {
      setIsTesting(false);
      setReport({
        agent: "Ghost-Protocol",
        attacks: [
          { type: "Prompt Injection", status: "Blocked", success: 0, details: "Attempted to force system role change via delimiters." },
          { type: "PII Extraction", status: "Detected", success: 5, details: "Extracted partial sample email using indirect prompt." },
          { type: "Jailbreak", status: "Blocked", success: 0, details: "Used 'DAN' persona pattern. Filtered by toxicity layer." },
          { type: "Toxicity Stress", status: "Blocked", success: 0, details: "High-intensity adversarial input sequence." },
        ],
        vulnerability_score: 12,
        recommendation: "Increase contextual awareness on the output guardrail layer to prevent indirect data leakage."
      });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white italic">Automated <span className="text-red-500">Red Teaming</span></h2>
          <p className="text-gray-500">Adversarial stress testing to identify vulnerabilities before deployment.</p>
        </div>
        <Button 
          onClick={startTest} 
          disabled={isTesting}
          className={`bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(239,68,68,0.2)] ${isTesting ? 'opacity-70' : ''}`}
        >
          {isTesting ? <Loader2 className="animate-spin mr-2" size={16}/> : <Flame className="mr-2" size={16}/>}
          {isTesting ? 'Stress Testing...' : 'Initiate Full Red-Team Scan'}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Threats / Attack Surface */}
        <div className="space-y-6">
          <Card title="Attack Surface Analysis">
             <div className="space-y-4">
              <SurfaceItem label="API Endpoints" status="Secure" color="text-green-400" />
              <SurfaceItem label="Prompt Injection" status="Vulnerable (Minor)" color="text-yellow-400" />
              <SurfaceItem label="Data Exfiltration" status="Secure" color="text-green-400" />
              <SurfaceItem label="Persona Jailbreak" status="Secure" color="text-green-400" />
            </div>
          </Card>

          <Card title="Simulated Adversaries">
            <div className="space-y-3">
              <AdversaryItem name="Script Kiddie" level="Low" />
              <AdversaryItem name="Malicious Insider" level="Medium" />
              <AdversaryItem name="State Actor (APT)" level="High" />
            </div>
          </Card>
        </div>

        {/* Test Results */}
        <div className="lg:col-span-2">
           {report ? (
            <div className="animate-slide-up space-y-6">
              <Card className="border-red-500/20 bg-red-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldAlert size={120} className="text-red-500" />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-black text-white">Vulnerability Summary</h3>
                    <p className="text-xs text-gray-500 uppercase font-black tracking-widest mt-1">Target: {report.agent}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Risk Score</p>
                    <p className="text-4xl font-black text-red-500">{report.vulnerability_score}<span className="text-sm text-gray-500">/100</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.attacks.map((attack: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0d0b14] border border-white/5 rounded-xl flex items-start gap-3">
                      <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${attack.success > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                      <div>
                        <p className="text-sm font-bold text-white">{attack.type}</p>
                        <p className="text-[10px] text-gray-500 mb-2">{attack.details}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${attack.status === 'Blocked' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {attack.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                  <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-xs font-bold text-white">Recommendation</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{report.recommendation}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="secondary" className="flex-1 text-xs border-white/10">Download Full PDF Report</Button>
                  <Button className="flex-1 text-xs bg-red-600 hover:bg-red-700">Apply Hardened Rules</Button>
                </div>
              </Card>
            </div>
          ) : isTesting ? (
            <Card className="h-full flex flex-col items-center justify-center py-40 border-white/5 border-dashed bg-transparent">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-3xl animate-pulse"></div>
                <Zap size={64} className="text-red-500 relative animate-bounce" />
              </div>
              <p className="mt-8 text-lg font-black text-white animate-pulse">EXECUTING ATTACK VECTORS</p>
              <p className="text-xs text-gray-500 mt-2">Attempting prompt injection, jailbreaking, and data leakage...</p>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center py-40 border-white/5 border-dashed bg-transparent opacity-30">
              <Target size={64} className="text-gray-500 mb-6" />
              <p className="text-sm font-bold">No active scan. Select an agent to begin.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const SurfaceItem = ({ label, status, color }: any) => (
  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
    <span className="text-xs font-bold text-white">{label}</span>
    <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{status}</span>
  </div>
);

const AdversaryItem = ({ name, level }: any) => (
  <div className="flex items-center justify-between p-3 bg-[#0d0b14] border border-white/5 rounded-xl hover:border-red-500/30 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-red-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
      <p className="text-xs font-bold text-white">{name}</p>
    </div>
    <span className="text-[10px] text-gray-500 uppercase font-black">{level}</span>
  </div>
);
