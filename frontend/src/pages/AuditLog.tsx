// src/pages/AuditLog.tsx
import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { Card } from '../components/Card';
import { Search, Filter, ShieldAlert, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const AuditLog = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/audit/logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return fetchLogs();
    setLoading(true);
    try {
      const res = await api.get(`/audit/search?q=${encodeURIComponent(query)}`);
      setLogs(res.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white">Governance <span className="text-primary">Audit Log</span></h2>
          <p className="text-gray-500">Immutable trail of all AI agent decisions and policy enforcements.</p>
        </div>
      </header>

      {/* NL Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything: 'Show me prompt injections in last 24h' or 'Find all high risk logs'..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 outline-none transition-all shadow-2xl glass"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:shadow-[0_0_15px_rgba(170,59,255,0.4)] transition-all">
          Query Engine
        </button>
      </form>

      {/* Logs Table */}
      <Card className="p-0 overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Timestamp</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Agent</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Event Type</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Risk Level</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-gray-600" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-white">{log.agent}</td>
                  <td className="p-4 text-xs text-gray-300 font-medium">{log.event}</td>
                  <td className="p-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${
                      log.risk === 'High' ? 'bg-red-500/20 text-red-400' : 
                      log.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {log.risk}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {log.action === 'Blocked' ? <ShieldAlert size={14} className="text-red-500" /> : 
                       log.action === 'Redacted' ? <AlertCircle size={14} className="text-yellow-500" /> : 
                       <CheckCircle2 size={14} className="text-green-500" />}
                      <span className="text-xs font-bold text-white">{log.action}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-500 italic">No audit records found matching your query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
