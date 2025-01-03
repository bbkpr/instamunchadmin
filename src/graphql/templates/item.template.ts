import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      name
      basePrice
      expirationPeriod
      createdAt
      updatedAt
      machineItems {
        id
        name
        quantity
        machine {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
