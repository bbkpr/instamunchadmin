import { gql } from '@apollo/client';

export const GET_MACHINE_MANUFACTURERS = gql`
  query GetMachineManufacturers {
    getMachineManufacturers {
      id
      name
      machines {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
