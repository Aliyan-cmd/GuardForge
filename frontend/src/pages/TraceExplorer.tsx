// src/pages/TraceExplorer.tsx
import React, { useState } from 'react';
import { 
  ReactFlow,
  Background, 
  Controls, 
  MiniMap,
  type Node,
  type Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card } from '../components/Card';

const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'input', 
    data: { label: 'User Query' }, 
    position: { x: 250, y: 0 },
    style: { background: 'rgba(170, 59, 255, 0.1)', color: '#fff', border: '1px solid #aa3bff', borderRadius: '8px' }
  },
  { 
    id: '2', 
    data: { label: 'Agent Reasoning' }, 
    position: { x: 250, y: 100 },
    style: { background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }
  },
  { 
    id: '3', 
    data: { label: 'Guardrail Check' }, 
    position: { x: 100, y: 200 },
    style: { background: 'rgba(34, 197, 94, 0.1)', color: '#fff', border: '1px solid #22c55e', borderRadius: '8px' }
  },
  { 
    id: '4', 
    data: { label: 'Tool: Search' }, 
    position: { x: 400, y: 200 },
    style: { background: 'rgba(59, 130, 246, 0.1)', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }
  },
  { 
    id: '5', 
    type: 'output', 
    data: { label: 'Final Response' }, 
    position: { x: 250, y: 300 },
    style: { background: 'rgba(170, 59, 255, 0.2)', color: '#fff', border: '1px solid #aa3bff', borderRadius: '8px' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' },
];

export const TraceExplorer = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
       <header>
        <h2 className="text-3xl font-black text-white">Interactive <span className="text-primary">Trace Explorer</span></h2>
        <p className="text-gray-500">Visualizing Agent logic and decision pathways.</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        <Card className="lg:col-span-3 p-0 overflow-hidden relative border-white/5">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            onNodeClick={(_, node) => setSelectedNode(node)}
            fitView
            colorMode="dark"
            style={{ background: '#0d0d12' }}
          >
            <Background color="#333" gap={20} />
            <Controls />
            <MiniMap 
               nodeColor={(n) => {
                if (n.type === 'input') return '#aa3bff';
                if (n.type === 'output') return '#aa3bff';
                return '#333';
              }}
              maskColor="rgba(0,0,0,0.5)"
              style={{ background: '#16171d', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </ReactFlow>
        </Card>

        <aside className="space-y-6">
          <Card title="Step Details">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-[10px] uppercase font-black text-primary mb-1 tracking-widest">Node ID</p>
                  <p className="text-sm font-bold">{selectedNode.id}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-[10px] uppercase font-black text-primary mb-1 tracking-widest">Operation</p>
                  <p className="text-sm font-bold">{(selectedNode.data as any).label}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-[10px] uppercase font-black text-primary mb-1 tracking-widest">Metadata</p>
                  <pre className="text-[10px] text-gray-400 mt-2 bg-black/40 p-2 rounded whitespace-pre-wrap">
                    {JSON.stringify({ latency: '145ms', tokens: 42, provider: 'openai/gpt-4o' }, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Select a node in the graph to see execution details.</p>
            )}
          </Card>

          <Card title="Timeline View">
            <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              <TimelineItem time="10:42:01" label="Query Received" status="ok" />
              <TimelineItem time="10:42:02" label="Policy Check" status="ok" />
              <TimelineItem time="10:42:03" label="Agent Thinking" status="loading" />
              <TimelineItem time="10:42:05" label="Response Sent" status="pending" />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

const TimelineItem = ({ time, label, status }: { time: string, label: string, status: 'ok' | 'loading' | 'pending' }) => (
  <div className="flex items-center gap-4 pl-6 relative">
    <div className={`absolute left-[4px] h-2 w-2 rounded-full ${status === 'ok' ? 'bg-primary' : status === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-700'}`}></div>
    <div className="text-[10px] font-bold text-gray-500 w-12">{time}</div>
    <div className="text-xs font-bold text-white">{label}</div>
  </div>
);
