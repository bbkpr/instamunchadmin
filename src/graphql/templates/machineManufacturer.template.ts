import { gql } from '@apollo/client';

export const CREATE_MACHINE_MANUFACTURER = gql`
  mutation CreateMachineManufacturer($input: CreateMachineManufacturerInput!) {
    createMachineManufacturer(input: $input) {
      code
      success
      message
      manufacturer {
        id
        name
        createdAt
        updatedAt
        machines {
          id
          name
        }
        machineTypes {
          id
          name
        }
      }
    }
  }
`;

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

export const UPDATE_MACHINE_MANUFACTURER = gql`
  mutation UpdateMachineManufacturer($input: UpdateMachineManufacturerInput!) {
    updateMachineManufacturer(input: $input) {
      code
      success
      message
      manufacturer {
        id
        name
        createdAt
        updatedAt
        machines {
          id
          name
        }
        machineTypes {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_MACHINE_MANUFACTURER = gql`
  mutation DeleteMachineManufacturer($id: ID!) {
    deleteMachineManufacturer(id: $id) {
      code
      success
      message
    }
  }
`;
