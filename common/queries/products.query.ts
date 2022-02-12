import { gql } from '@apollo/client';
export const productsQuery = gql`
  {
    products(first: 10) {
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
