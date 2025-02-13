import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.VITE_GRAPHQL_URI || 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const client = new ApolloClient({
  devtools: { enabled: true },
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Location: {
        fields: {
          machineLocations: {
            merge(existing = [], incoming: any[]) {
              const output = [...existing];
              if (Array.isArray(incoming)) {
                output.push(...incoming);
              }
              return output;
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
