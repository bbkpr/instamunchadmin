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

// graphql/mutations.ts
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
