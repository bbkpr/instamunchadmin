import { gql } from '@apollo/client';

export const CREATE_MACHINE_TYPE = gql`
  mutation CreateMachineType($input: CreateMachineTypeInput!) {
    createMachineType(input: $input) {
      code
      success
      message
      machineType {
        id
        name
        manufacturerId
        manufacturer {
          id
          name
        }
      }
    }
  }
`;

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

export const UPDATE_MACHINE_TYPE = gql`
  mutation UpdateMachineType($input: UpdateMachineTypeInput!) {
    updateMachineType(input: $input) {
      code
      success
      message
      machineType {
        id
        name
        manufacturerId
        manufacturer {
          id
          name
        }
      }
    }
  }
`;
