import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  devtools: { enabled: true },
  uri: process.env.VITE_GRAPHQL_URI || 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Location: {
        fields: {
          machineLocations: {
            merge(existing = [], incoming: any[]) {
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});
