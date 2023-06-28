import { gql } from '@apollo/client';
export const createCart = gql`
  mutation cartCreate {
    cartCreate {
      cart {
        checkoutUrl
        id
      }
    }
  }
`;
