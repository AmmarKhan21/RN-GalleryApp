import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 for localhost; physical Android needs your machine's LAN IP
const SERVER_HOST =
  Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const SERVER_URL = `http://${SERVER_HOST}:4000/graphql`;

const httpLink = new HttpLink({
  uri: SERVER_URL,
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Image: {
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
