import { gql } from '@apollo/client';
export const productVariantsQuery = gql`
  {
    products(first: 100) {
      edges {
        node {
          title
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
