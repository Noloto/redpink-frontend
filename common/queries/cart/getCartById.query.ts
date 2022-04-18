import { gql } from '@apollo/client';
export const getCartById = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      checkoutUrl
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            estimatedCost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
