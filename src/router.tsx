import { createBrowserRouter, Navigate } from 'react-router';

import Index from './pages/Index';
import Notfound from './pages/Notfound';
import { Locations } from '@/pages/Locations';
import { Layout } from '@/components/Layout/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MachineDetails } from '@/pages/MachineDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/machines" replace />
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
