import { gql } from '@apollo/client';

export const GET_MACHINE_TYPES = gql`
  query GetMachineTypes {
    getMachineTypes {
      id
      name
      createdAt
      updatedAt
      machines {
        id
        name
        createdAt
        updatedAt
      }
      manufacturerId
      manufacturer {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
