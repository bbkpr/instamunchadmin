import { gql } from '@apollo/client';

export const CREATE_MACHINE_MANUFACTURER = gql`
  mutation CreateMachineManufacturer($input: CreateMachineManufacturerInput!) {
    createMachineManufacturer(input: $input) {
      code
      success
      message
      manufacturer {
        id
        tenantId
        name
        createdAt
        updatedAt
        machines {
          id
          tenantId
          name
        }
        machineTypes {
          id
          tenantId
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
        tenantId
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
        tenantId
        name
        createdAt
        updatedAt
        machines {
          id
          tenantId
          name
        }
        machineTypes {
          id
          tenantId
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
