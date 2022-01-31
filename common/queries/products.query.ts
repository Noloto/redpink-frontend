import gql from 'graphql-tag';
export const productsQuery = gql`
  {
    products(first: 3) {
      edges {
        node {
          title
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;
