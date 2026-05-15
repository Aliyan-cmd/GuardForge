import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Landing } from './pages/Landing';
import { Features } from './pages/Features';
import { HowItWorks } from './pages/HowItWorks';
import { Reviews } from './pages/Reviews';
import { Docs } from './pages/Docs';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { TraceExplorer } from './pages/TraceExplorer';
import { WorkflowBuilder } from './pages/WorkflowBuilder';
import { Explainability } from './pages/Explainability';
import { AgentBuilder } from './pages/AgentBuilder';
import { AuditLog } from './pages/AuditLog';
import { Layout } from './components/Layout';
import { PolicyGenerator } from './pages/PolicyGenerator';
import { AgentHealth } from './pages/AgentHealth';
import { IntegrationHub } from './pages/IntegrationHub';
import { SafetyScanner } from './pages/SafetyScanner';
import { SwarmIntelligence } from './pages/SwarmIntelligence';
import { RedTeam } from './pages/RedTeam';
import { Profile } from './pages/Profile';
import { Signout } from './pages/Signout';
import { Agents, Policies, Workflows, Approvals } from './pages/Placeholder';
import './index.css';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const storedToken = localStorage.getItem('guardforge_token');
  return (token || storedToken) ? <>{children}</> : <Navigate to="/landing" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const storedToken = localStorage.getItem('guardforge_token');
  return (token || storedToken) ? <Navigate to="/" replace /> : <>{children}</>;
};

function App() {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        alert("Command Palette coming soon! Use Ctrl+G for Governance overview.");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public landing + auth pages */}
          <Route path="/landing" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/features" element={<PublicRoute><Features /></PublicRoute>} />
          <Route path="/how-it-works" element={<PublicRoute><HowItWorks /></PublicRoute>} />
          <Route path="/reviews" element={<PublicRoute><Reviews /></PublicRoute>} />
          <Route path="/docs" element={<PublicRoute><Docs /></PublicRoute>} />
          <Route path="/pricing" element={<PublicRoute><Pricing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          {/* Protected app */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="trace" element={<TraceExplorer />} />
                    <Route path="explain" element={<Explainability />} />
                    <Route path="agents" element={<Agents />} />
                    <Route path="agents/builder" element={<AgentBuilder />} />
                    <Route path="agents/health" element={<AgentHealth />} />
                    <Route path="policies" element={<Policies />} />
                    <Route path="policies/generator" element={<PolicyGenerator />} />
                    <Route path="workflows" element={<Workflows />} />
                    <Route path="workflows/designer" element={<WorkflowBuilder />} />
                    <Route path="integrations" element={<IntegrationHub />} />
                    <Route path="scanner" element={<SafetyScanner />} />
                    <Route path="approvals" element={<Approvals />} />
                    <Route path="redteam" element={<RedTeam />} />
                    <Route path="audit" element={<AuditLog />} />
                    <Route path="swarm" element={<SwarmIntelligence />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="signout" element={<Signout />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
