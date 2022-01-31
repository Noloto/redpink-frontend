import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://red-p-nk.myshopify.com/admin/api/2022-1/graphql.json',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'c1a3dd0ecfcd5281ded53c915ee881e9',
      ...headers,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
export default client;
