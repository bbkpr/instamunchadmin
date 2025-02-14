import { createBrowserRouter, Outlet } from 'react-router';

import Index from './pages/Index';
import Notfound from './pages/Notfound';
import { Locations } from '@/pages/Locations';
import { Layout } from '@/components/Layout/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MachineDetails } from '@/pages/MachineDetails';
import { UserManagement } from '@/pages/UserManagement';
import { Login } from '@/pages/Login';
import { AuthWrapper } from '@/components/AuthWrapper';
import { AuditLogTable } from '@/pages/AuditLogTable';
import { UserSettings } from '@/pages/UserSettings';
import { Items } from '@/pages/Items';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    )
  },
  {
    path: '/',
    element: (
      <AuthWrapper>
        <Layout>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Layout>
      </AuthWrapper>
    ),
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'items',
        element: <Items />
      },
      {
        path: 'machines',
        element: <Index />
      },
      {
        path: 'machines/:machineId',
        element: <MachineDetails />
      },
      {
        path: 'locations',
        element: <Locations />
      },
      {
        path: 'users',
        element: <UserManagement />
      },
      {
        path: 'auditlogs',
        element: <AuditLogTable />
      },
      {
        path: 'settings',
        element: <UserSettings />
      },
      {
        path: '*',
        element: <Notfound />
      }
    ]
  }
]);

export default router;
