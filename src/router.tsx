import { createBrowserRouter } from 'react-router';

import Index from './pages/Index';
import Notfound from './pages/Notfound';
import { Locations } from '@/pages/Locations';
import { Layout } from '@/components/Layout/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';

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
