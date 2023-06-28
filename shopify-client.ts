import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://red-p-nk.myshopify.com/api/2023-04/graphql.json',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_ACCESS_TOKEN,
    },
  };
});

const ShopifyClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default ShopifyClient;
