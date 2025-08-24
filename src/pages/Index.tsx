import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { FullPageLoader } from '@/components/ui/loading-spinner';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  return user ? <Dashboard /> : <AuthPage />;
};

export default Index;
