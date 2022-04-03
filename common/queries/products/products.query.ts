import { gql } from '@apollo/client';
export const productsQuery = gql`
  {
    products(first: 100) {
      edges {
        node {
          id
          title
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
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
