import { gql } from '@apollo/client';
export const updateLineQuantity = gql`
  mutation updateLineQuantity($cartId: ID!, $lineId: ID!, $quantity: Int!) {
    cartLinesUpdate(
      cartId: $cartId
      lines: { id: $lineId, quantity: $quantity }
    ) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
