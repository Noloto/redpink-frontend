import { gql } from '@apollo/client';
export const productsQuery = gql`
  {
    cart(id) {
    id
    }
  }
`;
