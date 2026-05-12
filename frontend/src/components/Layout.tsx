// src/components/Layout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  ShieldCheck, 
  Network, 
  FileText, 
  Eye, 
  UserCircle,
  Settings,
  History,
  Sparkles,
  Heart,
  Blocks,
  Scan
} from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18}/>, path: '/' },
    { label: 'Trace Explorer', icon: <Eye size={18}/>, path: '/trace' },
    { label: 'Explainability', icon: <FileText size={18}/>, path: '/explain' },
    { label: 'Workflow Designer', icon: <Network size={18}/>, path: '/workflows/designer' },
    { label: 'Agent Architect', icon: <Cpu size={18}/>, path: '/agents/builder' },
    { label: 'Agent Health', icon: <Heart size={18}/>, path: '/agents/health' },
    { label: 'AI Policy Gen', icon: <Sparkles size={18}/>, path: '/policies/generator' },
    { label: 'Integrations', icon: <Blocks size={18}/>, path: '/integrations' },
    { label: 'Safety Scanner', icon: <Scan size={18}/>, path: '/scanner' },
    { label: 'Audit Logs', icon: <History size={18}/>, path: '/audit' },
    { label: 'Settings', icon: <Settings size={18}/>, path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#08060d] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0d0b14] flex flex-col z-50">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tighter text-white">Guard<span className="text-primary">Forge</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Enterprise AI Governance</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                location.pathname === item.path 
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(170,59,255,0.1)]' 
                : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={location.pathname === item.path ? 'text-primary' : 'text-gray-500 group-hover:text-white'}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
           <div className="flex -space-x-2 mb-4 px-2">
              <div className="h-6 w-6 rounded-full border-2 border-[#0d0b14] bg-blue-500 flex items-center justify-center text-[8px] font-bold">JD</div>
              <div className="h-6 w-6 rounded-full border-2 border-[#0d0b14] bg-green-500 flex items-center justify-center text-[8px] font-bold">AL</div>
              <div className="h-6 w-6 rounded-full border-2 border-[#0d0b14] bg-pink-500 flex items-center justify-center text-[8px] font-bold">SK</div>
              <div className="h-6 w-6 rounded-full border-2 border-[#0d0b14] bg-white/10 flex items-center justify-center text-[8px] font-bold text-gray-400">+2</div>
           </div>
           <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">A</div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">Aliyan Admin</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Superuser</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(170,59,255,0.05),transparent_50%)] pointer-events-none"></div>
        {children}
      </main>
    </div>
  );
};
