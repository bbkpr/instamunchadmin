import { gql } from '@apollo/client';

export const CREATE_MACHINE = gql`
  mutation CreateMachine($input: CreateMachineInput!) {
    createMachine(input: $input) {
      code
      success
      message
      machine {
        id
        name
        machineType {
          id
          name
        }
        manufacturer {
          id
          name
        }
      }
    }
  }
`;

export const GET_MACHINES = gql`
  query GetMachines {
    getMachines {
      id
      name
      createdAt
      updatedAt
      machineType {
        id
        name
        createdAt
        updatedAt
      }
      manufacturer {
        id
        name
        createdAt
        updatedAt
      }
      machineItems {
        id
        name
        quantity
        item {
          id
          name
          basePrice
          createdAt
          updatedAt
        }
      }
      machineLocations {
        id
        name
        location {
          id
          address1
          address2
          city
          stateOrProvince
          country
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const UPDATE_MACHINE = gql`
  mutation UpdateMachine($input: UpdateMachineInput!) {
    updateMachine(input: $input) {
      code
      success
      message
      machine {
        id
        name
        machineType {
          id
          name
        }
        manufacturer {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_MACHINE = gql`
  mutation DeleteMachine($id: ID!) {
    deleteMachine(id: $id) {
      code
      success
      message
    }
  }
`;
