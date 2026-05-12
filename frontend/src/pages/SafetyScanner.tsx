// src/pages/SafetyScanner.tsx
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Scan, 
  Image as ImageIcon, 
  FileText, 
  ShieldCheck, 
  AlertTriangle,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export const SafetyScanner = () => {
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const startScan = () => {
    if (!file) return;
    setScanning(true);
    setResults(null);
    setTimeout(() => {
      setScanning(false);
      setResults({
        type: file.type.startsWith('image/') ? 'Image' : 'Document',
        threats: [
          { type: 'Face Detection', status: 'Flagged', risk: 'Medium', details: 'Detected biological identifiable feature.' },
          { type: 'PII Text', status: 'Clean', risk: 'Low', details: 'No credit cards or SSNs found in OCR.' },
          { type: 'Toxic Content', status: 'Clean', risk: 'Low', details: 'No harmful symbolism detected.' },
        ],
        safe: false
      });
    }, 2500);
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Multi-Modal <span className="text-primary">Safety Scanner</span></h2>
          <p className="text-gray-500">Scan images and documents for sensitive data and harmful content.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col items-center justify-center py-20 border-dashed border-white/10 hover:border-primary/50 transition-all group">
          {!file ? (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Scan size={32} className="text-gray-500 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-white font-bold">Upload Image or Document</p>
                <p className="text-[10px] text-gray-500">PNG, JPG, PDF (Max 5MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                id="scanner-upload" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button onClick={() => document.getElementById('scanner-upload')?.click()} variant="secondary">Select File</Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="h-24 w-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20 relative overflow-hidden">
                {file.type.startsWith('image/') ? (
                   <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                ) : (
                  <FileText className="text-primary" size={40} />
                )}
                <ImageIcon className="text-primary absolute" size={40} />
              </div>
              <div>
                <p className="text-white font-bold">{file.name}</p>
                <p className="text-[10px] text-gray-500 uppercase font-black">{file.type}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" onClick={() => setFile(null)}>Cancel</Button>
                <Button onClick={startScan} disabled={scanning}>
                  {scanning ? <Loader2 className="animate-spin mr-2" size={16}/> : <Scan className="mr-2" size={16}/>}
                  {scanning ? 'Scanning...' : 'Scan for Threats'}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          {results ? (
            <Card title="Scan Analysis Results" className={results.safe ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  {results.safe ? <CheckCircle2 className="text-green-500" /> : <AlertTriangle className="text-red-500" />}
                  <h4 className={`text-lg font-black ${results.safe ? 'text-green-400' : 'text-red-400'}`}>
                    {results.safe ? 'File is Safe' : 'Threats Detected'}
                  </h4>
                </div>
                
                <div className="space-y-2">
                  {results.threats.map((t: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5">
                      <div>
                        <p className="text-xs font-bold text-white">{t.type}</p>
                        <p className="text-[10px] text-gray-500">{t.details}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${
                        t.status === 'Flagged' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-white/5 border-white/10 hover:bg-white/10">View Detailed Log</Button>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center border-dashed border-white/5 bg-transparent opacity-30">
              <div className="text-center">
                <Scan size={40} className="mx-auto text-gray-500 mb-2" />
                <p className="text-sm font-bold text-gray-500">Analysis results will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
