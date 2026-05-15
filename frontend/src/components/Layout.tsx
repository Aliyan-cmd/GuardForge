import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Cpu, ShieldCheck, Network, FileText,
  Eye, UserCircle, Settings, History, Sparkles, Heart,
  Blocks, Scan, Users, LogOut, Shield, ChevronRight,
  Activity, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: <LayoutDashboard size={17}/>, path: '/' },
      { label: 'Trace Explorer', icon: <Eye size={17}/>, path: '/trace' },
      { label: 'Explainability', icon: <FileText size={17}/>, path: '/explain' },
    ],
  },
  {
    label: 'Governance',
    items: [
      { label: 'Workflow Designer', icon: <Network size={17}/>, path: '/workflows/designer' },
      { label: 'Agent Architect', icon: <Cpu size={17}/>, path: '/agents/builder' },
      { label: 'Agent Health', icon: <Heart size={17}/>, path: '/agents/health' },
      { label: 'AI Policy Gen', icon: <Sparkles size={17}/>, path: '/policies/generator' },
    ],
  },
  {
    label: 'Security',
    items: [
      { label: 'Safety Scanner', icon: <Scan size={17}/>, path: '/scanner' },
      { label: 'Red Team', icon: <ShieldCheck size={17}/>, path: '/redteam' },
      { label: 'Swarm Intel', icon: <Users size={17}/>, path: '/swarm' },
      { label: 'Audit Logs', icon: <History size={17}/>, path: '/audit' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'Integrations', icon: <Blocks size={17}/>, path: '/integrations' },
      { label: 'Approvals', icon: <Activity size={17}/>, path: '/approvals' },
    ],
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-[#06040e] text-white overflow-hidden">
      {/* ── Sidebar ── */}
      <aside
        className={`relative border-r border-white/5 flex flex-col z-50 transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[70px]' : 'w-64'}`}
        style={{ background: 'linear-gradient(180deg, #090714 0%, #06040e 100%)' }}>

        {/* collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-[#0e0b1a] border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-primary/40 transition-all z-10">
          <ChevronRight size={12} className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
        </button>

        {/* Logo */}
        <div className={`p-5 flex items-center gap-3 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center shrink-0 animate-pulse-glow">
            <Shield size={17} className="text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in overflow-hidden">
              <h1 className="text-lg font-black tracking-tight text-white leading-none">Guard<span className="text-primary">Forge</span></h1>
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.15em] mt-0.5">AI Governance</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar space-y-5">
          {navGroups.map(group => (
            <div key={group.label}>
              {!collapsed && (
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 px-3 mb-2">{group.label}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = isActive(item.path);
                  return (
                    <Link key={item.path} to={item.path}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative
                        ${active
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_12px_rgba(170,59,255,0.1)]'
                          : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                        } ${collapsed ? 'justify-center' : ''}`}>
                      {/* active indicator */}
                      {active && !collapsed && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
                      )}
                      <span className={`shrink-0 transition-colors ${active ? 'text-primary' : 'text-gray-600 group-hover:text-gray-300'}`}>
                        {item.icon}
                      </span>
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className={`p-3 border-t border-white/5 space-y-2 ${collapsed ? 'flex flex-col items-center' : ''}`}>
          {/* status indicator */}
          {!collapsed && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/5 rounded-lg border border-green-500/10 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span className="text-[10px] text-green-400 font-semibold">System Operational</span>
            </div>
          )}

          <Link to="/profile"
            className={`flex items-center gap-3 p-2.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-primary/20 transition-all group ${collapsed ? 'justify-center w-full' : ''}`}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/40 to-purple-600/40 flex items-center justify-center text-primary font-black text-xs shrink-0 uppercase border border-primary/20 group-hover:border-primary/40 transition-all">
              {user?.email?.[0] || 'U'}
            </div>
            {!collapsed && (
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-bold text-white truncate">{user?.full_name || user?.email?.split('@')[0] || 'User'}</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">{user?.role || 'Viewer'}</p>
              </div>
            )}
          </Link>

          <Link to="/signout"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-500/70 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all text-xs font-semibold group ${collapsed ? 'justify-center w-full' : ''}`}>
            <LogOut size={15} className="shrink-0" />
            {!collapsed && 'Sign Out'}
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        {/* subtle background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/[0.03] to-transparent" />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(6,182,212,0.03) 0%, transparent 50%)' }} />
        </div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};
