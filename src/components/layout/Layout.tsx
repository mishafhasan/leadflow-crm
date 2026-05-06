import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen p-4 pt-16 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
