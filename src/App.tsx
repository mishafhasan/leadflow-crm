import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from '@/context/AuthContext';
import { LeadsProvider } from '@/context/LeadsContext';
import Layout from '@/components/layout/Layout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import LeadsPage from '@/pages/LeadsPage';
import LeadDetailPage from '@/pages/LeadDetailPage';
import LandingPage from '@/pages/LandingPage';

import { useDarkMode } from '@/hooks/useDarkMode';

export default function App() {
  useDarkMode();
  return (
    <AuthProvider>
      <LeadsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />
          <Route
            path="/leads"
            element={
              <Layout>
                <LeadsPage />
              </Layout>
            }
          />
          <Route
            path="/leads/:id"
            element={
              <Layout>
                <LeadDetailPage />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </LeadsProvider>
    </AuthProvider>
  );
}
