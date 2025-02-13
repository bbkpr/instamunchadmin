import React from 'react';
import { RouterProvider } from 'react-router';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/graphql/apolloClient';

import ErrorBoundary from './components/ErrorBoundary';
import router from './router';
import { ThemeProvider } from '@/contexts/ThemeContext';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  </ApolloProvider>
);
App.displayName = 'App';
export default App;
