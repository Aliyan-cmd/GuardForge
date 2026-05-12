// src/components/AlertBell.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Button } from './Button';

export const AlertBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      try {
        const res = await api.get('/approvals/pending');
        setAlerts(res.data);
      } catch (err) {
        console.error("Failed to fetch alerts", err);
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="relative">
      <Button variant="secondary" onClick={() => setOpen(!open)} className="relative">
        🔔
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {alerts.length}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg glass z-10 max-h-80 overflow-y-auto border border-white/20">
          <div className="p-4">
            <h4 className="font-medium mb-2 text-primary">Pending Approvals</h4>
            {alerts.length === 0 ? (
              <p className="text-sm text-gray-500">No pending items.</p>
            ) : (
              alerts.map((a: any) => (
                <div key={a.id} className="border-b border-gray-200 dark:border-gray-700 py-2 last:border-0">
                  <p className="text-sm">
                    <strong className="text-red-500">{a.severity.toUpperCase()}</strong> – {a.reason}
                  </p>
                  <p className="text-xs text-gray-400">{new Date(a.created_at).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
