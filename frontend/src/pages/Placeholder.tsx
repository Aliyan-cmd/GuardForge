// src/pages/Placeholder.tsx
import React from 'react';
import { Card } from '../components/Card';

export const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
    <Card>
      <p className="text-gray-400">This module is currently under development for Phase 2.5.</p>
    </Card>
  </div>
);

export const Agents = () => <PlaceholderPage title="Agent Management" />;
export const Policies = () => <PlaceholderPage title="Governance Policies" />;
export const Workflows = () => <PlaceholderPage title="AI Workflows" />;
export const Approvals = () => <PlaceholderPage title="Pending Approvals" />;
export const RedTeam = () => <PlaceholderPage title="Red-Team Simulations" />;
export const Audit = () => <PlaceholderPage title="Audit Logs" />;
