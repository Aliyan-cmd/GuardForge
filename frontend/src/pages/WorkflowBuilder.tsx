// src/pages/WorkflowBuilder.tsx
import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Plus, GripVertical, Trash2, Settings2, PlayCircle, Zap } from 'lucide-react';

interface AgentStep {
  id: string;
  name: string;
  type: string;
}

const SortableItem = ({ id, name, type, onDelete }: { id: string, name: string, type: string, onDelete: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl glass mb-3 group hover:border-primary/50 transition-all">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-500">
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white">{name}</p>
        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{type}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Settings2 size={16}/></button>
        <button onClick={onDelete} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"><Trash2 size={16}/></button>
      </div>
    </div>
  );
};

export const WorkflowBuilder = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [steps, setSteps] = useState<AgentStep[]>([
    { id: '1', name: 'Classifier Agent', type: 'LLM Node' },
    { id: '2', name: 'PII Filter', type: 'Guardrail' },
    { id: '3', name: 'Knowledge Retrieval', type: 'Tool' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addStep = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setSteps([...steps, { id, name: 'New Agent Step', type: 'LLM Node' }]);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white">Workflow <span className="text-primary">Designer</span></h2>
          <p className="text-gray-500">Drag and drop to orchestrate multi-agent sequences.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={() => setIsSimulating(!isSimulating)}
            className={`border-white/10 ${isSimulating ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-white/5'}`}
          >
            {isSimulating ? <Zap size={16} className="mr-2 animate-pulse" /> : <PlayCircle size={16} className="mr-2" />}
            {isSimulating ? 'Stop Digital Twin' : 'Digital Twin Sim'}
          </Button>
          <Button className="shadow-[0_0_20px_rgba(170,59,255,0.3)]">Deploy Workflow</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative">
           {isSimulating && (
            <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] z-10 rounded-2xl border-2 border-primary/20 pointer-events-none flex flex-col items-center justify-center">
              <div className="bg-[#0d0b14] p-6 rounded-2xl border border-primary/30 shadow-2xl space-y-4 animate-slide-up pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Simulation Active</p>
                </div>
                <h4 className="text-sm font-bold text-white">Digital Twin Sandbox</h4>
                <p className="text-[10px] text-gray-500 max-w-[200px]">Running non-destructive tests on your orchestration...</p>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-progress"></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>Latency: 420ms</span>
                  <span className="text-green-400">0 Violations</span>
                </div>
              </div>
            </div>
          )}
          <Card title="Execution Pipeline">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={steps.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="relative">
                   {steps.length > 1 && <div className="absolute left-[21px] top-6 bottom-6 w-[2px] bg-white/5 z-0"></div>}
                   {steps.map((step) => (
                    <SortableItem 
                      key={step.id} 
                      id={step.id} 
                      name={step.name} 
                      type={step.type} 
                      onDelete={() => setSteps(steps.filter(s => s.id !== step.id))}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <button 
              onClick={addStep}
              className="w-full mt-4 p-4 border border-dashed border-white/10 rounded-xl text-gray-500 hover:text-white hover:border-primary/50 hover:bg-white/5 transition-all flex items-center justify-center gap-2 font-bold"
            >
              <Plus size={20} />
              Add Execution Step
            </button>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Workflow Settings">
             <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-black text-gray-500 mb-2 tracking-widest">Workflow Name</label>
                <input type="text" defaultValue="Standard Customer Support" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-primary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-gray-500 mb-2 tracking-widest">Global Policy</label>
                <select className="w-full p-3 bg-[#16171d] border border-white/10 rounded-xl text-sm focus:border-primary outline-none transition-all">
                  <option>Strict Governance v2</option>
                  <option>Development/Relaxed</option>
                </select>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400">Estimated Latency</span>
                  <span className="text-white font-bold">~1.2s</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Resource Usage</span>
                  <span className="text-green-400 font-bold">Optimized</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Available Templates">
            <div className="space-y-2">
              <TemplateItem name="RAG Pipeline" desc="Retrieve, Augment, Generate" />
              <TemplateItem name="HITL Approval" desc="Human-in-the-loop validation" />
              <TemplateItem name="Red-Teaming" desc="Adversarial stress test" />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

const TemplateItem = ({ name, desc }: { name: string, desc: string }) => (
  <div className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 cursor-pointer transition-all">
    <p className="text-xs font-bold text-white">{name}</p>
    <p className="text-[10px] text-gray-500">{desc}</p>
  </div>
);
