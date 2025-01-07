import { createBrowserRouter } from 'react-router';

import Index from './pages/Index';
import Notfound from './pages/Notfound';
import { Locations } from '@/pages/Locations';
import { Layout } from '@/components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Index />
      </Layout>
    )
  },
  {
    path: '/locations',
    element: (
      <Layout>
        <Locations />
      </Layout>
    )
  },
  {
    path: '*',
    element: (
      <Layout>
        <Notfound />
      </Layout>
    )
  }
]);

export default router;
