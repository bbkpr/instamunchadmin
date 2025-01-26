import { createBrowserRouter, Navigate } from 'react-router';

import Index from './pages/Index';
import Notfound from './pages/Notfound';
import { Locations } from '@/pages/Locations';
import { Layout } from '@/components/Layout/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MachineDetails } from '@/pages/MachineDetails';
import { UserManagement } from '@/pages/UserManagement';
import { Login } from '@/pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ErrorBoundary>
          <Index />
        </ErrorBoundary>
      </Layout>
    )
  },
  {
    path: '/login',
    element: (
      <Layout>
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </Layout>
    )
  },
  {
    path: '/machines',
    element: (
      <Layout>
        <ErrorBoundary>
          <Index />
        </ErrorBoundary>
      </Layout>
    )
  },
  {
    path: '/machines/:machineId',
    element: (
      <Layout>
        <ErrorBoundary>
          <MachineDetails />
        </ErrorBoundary>
      </Layout>
    )
  },
  {
    path: '/locations',
    element: (
      <Layout>
        <ErrorBoundary>
          <Locations />
        </ErrorBoundary>
      </Layout>
    )
  },
  {
    path: '/users',
    element: (
      <Layout>
        <ErrorBoundary>
          <UserManagement />
        </ErrorBoundary>
      </Layout>
    )
  },
  {
    path: '*',
    element: (
      <Layout>
        <ErrorBoundary>
          <Notfound />
        </ErrorBoundary>
      </Layout>
    )
  }
]);

export default router;
