
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { UserCircle, Mail, Shield, Calendar } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tight">User <span className="text-primary">Profile</span></h1>
        <p className="text-gray-500">Manage your account settings and governance permissions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 flex flex-col items-center text-center p-8 space-y-4 border-primary/20 bg-primary/5">
          <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-primary/30 shadow-[0_0_30px_rgba(170,59,255,0.2)]">
            <UserCircle size={60} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{user.email.split('@')[0]}</h3>
            <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full font-black uppercase tracking-widest border border-primary/30">
              {user.role}
            </span>
          </div>
        </Card>

        <Card className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Account Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Email Address</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Security Role</p>
                <p className="text-white font-medium capitalize">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Member Since</p>
                <p className="text-white font-medium">May 2024</p>
              </div>
            </div>
          </div>
          <div className="pt-4">
             <button className="w-full bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-bold hover:bg-white/10 transition-all text-gray-300">
               Edit Profile Information
             </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
