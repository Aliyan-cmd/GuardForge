// src/components/TraceViewer.tsx
import React from 'react';
import { Card } from './Card';
import type { WSMessage } from '../types';

interface TraceViewerProps {
  messages: WSMessage[];
}

export const TraceViewer: React.FC<TraceViewerProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.length === 0 && (
        <p className="text-gray-500 italic">No activity yet. Start a workflow to see traces.</p>
      )}
      {messages.map((msg, idx) => {
        if (msg.type !== 'trace_step') return null;
        const { step, agent_id, input, output, faithfulness, guardrail_passed } = msg;
        return (
          <Card key={idx} className="glass border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-primary">Step {step} – Agent {agent_id}</h4>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  guardrail_passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {guardrail_passed ? '✓ Secure' : '✗ Violation'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Input</p>
                <p className="bg-black/20 p-2 rounded border border-white/5">{input}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Output</p>
                <p className="bg-black/20 p-2 rounded border border-white/5">{output}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Faithfulness: <span className={faithfulness > 80 ? 'text-green-400' : 'text-yellow-400'}>{faithfulness?.toFixed(1) ?? '—'}%</span>
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
