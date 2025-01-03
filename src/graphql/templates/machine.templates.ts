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
      machineType {
        id
        name
      }
      manufacturer {
        id
        name
      }
      machineItems {
        id
        name
        quantity
        item {
          id
          name
          basePrice
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
