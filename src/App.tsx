import React from 'react';
import { RouterProvider } from 'react-router';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/graphql/apolloClient';

import ErrorBoundary from './components/ErrorBoundary';
import router from './router';

const App: React.FC = () => (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ApolloProvider>
);
App.displayName = 'App';
export default App;
