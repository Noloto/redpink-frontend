import { gql } from '@apollo/client';
export const getProductByHandle = gql`
  query getProductByHandle($productHandle: String!) {
    productByHandle(handle: $productHandle) {
      id
      handle
      title
      description
      tags
      totalInventory
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
            price {
              amount
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;
