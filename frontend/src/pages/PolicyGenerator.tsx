// src/pages/PolicyGenerator.tsx
import React, { useState } from 'react';
import api from '../api/client';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FileUp, Sparkles, ShieldCheck, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export const PolicyGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/policies/generate-from-doc', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      alert("Policy generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto animate-fade-in">
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
          <Sparkles size={12} />
          AI-Powered Intelligence
        </div>
        <h2 className="text-5xl font-black text-white tracking-tight">AI Policy <span className="text-primary">Generator</span></h2>
        <p className="text-gray-500 text-lg">Upload your corporate compliance PDFs or regulation documents. Our AI will extract governance rules and generate production-ready guardrail policies instantly.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Card */}
        <Card className="flex flex-col items-center justify-center py-20 border-dashed border-white/10 hover:border-primary/50 transition-all group">
          {!file ? (
            <div className="text-center space-y-4">
              <div className="h-20 w-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <FileUp size={40} className="text-gray-500 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-white font-bold">Drop compliance PDF here</p>
                <p className="text-xs text-gray-500">Supports PDF, TXT, MD (Max 10MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                id="policy-upload" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button onClick={() => document.getElementById('policy-upload')?.click()} variant="secondary">Browse Files</Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <div>
                <p className="text-white font-bold">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to process</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" onClick={() => setFile(null)}>Reset</Button>
                <Button onClick={handleUpload} disabled={loading} className="min-w-[140px]">
                  {loading ? <Loader2 className="animate-spin mr-2" size={16}/> : <Sparkles className="mr-2" size={16}/>}
                  {loading ? 'Analyzing...' : 'Generate Policy'}
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Results Preview */}
        <div className="space-y-6">
          {result ? (
            <div className="animate-slide-up space-y-6">
              <Card title="Generated Policy Preview">
                <div className="space-y-4">
                   <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-xs text-gray-400">Confidence Score</span>
                    <span className="text-sm font-black text-green-400">{(result.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                    <h4 className="text-sm font-bold text-white border-b border-white/5 pb-2">{result.generated_policy.name}</h4>
                    {result.generated_policy.rules.map((rule: any, i: number) => (
                      <div key={i} className="flex gap-3">
                        <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center text-primary text-[10px] font-black shrink-0">{i+1}</div>
                        <div>
                          <p className="text-xs font-bold text-white">{rule.type} Rule ({rule.action})</p>
                          <p className="text-[10px] text-gray-500">{rule.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Deploy This Policy</Button>
                </div>
              </Card>

              <Card title="Extraction Insights" className="bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-primary shrink-0 mt-1" />
                  <p className="text-xs text-gray-400 leading-relaxed">Our AI identified 4 key compliance sections in your document. The generated rules specifically address the <span className="text-white font-bold">Data Privacy</span> and <span className="text-white font-bold">Safety</span> requirements found on page 2.</p>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center bg-transparent border-white/5 border-dashed">
              <div className="text-center space-y-2 opacity-30">
                <ArrowRight size={32} className="mx-auto text-gray-500 mb-2" />
                <p className="text-sm font-bold">Generated Policy results will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
