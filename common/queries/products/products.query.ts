import { gql } from '@apollo/client';
export const productsQuery = gql`
  {
    products(first: 100) {
      edges {
        node {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                image {
                  url
                  altText
                }
                priceV2 {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
