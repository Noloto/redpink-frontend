import { gql } from '@apollo/client';
export const createCheckout = gql`
  mutation CheckoutCreate($variantId: ID!, $quantity: String) {
    checkoutCreate(
      input: { lineItems: { variantId: $variantId, quantity: $quantity } }
    ) {
      checkout {
        webUrl
      }
    }
  }
`;
