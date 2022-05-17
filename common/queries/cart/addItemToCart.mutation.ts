import { gql } from '@apollo/client';
export const addItemToCart = gql`
  mutation addToCart($cartId: ID!, $variantId: ID!, $quantity: Int) {
    cartLinesAdd(
      cartId: $cartId
      lines: [{ quantity: $quantity, merchandiseId: $variantId }]
    ) {
      cart {
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
