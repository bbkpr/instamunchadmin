import { gql } from '@apollo/client';

export const CREATE_MACHINE_ITEM = gql`
  mutation CreateMachineItem($input: CreateMachineItemInput!) {
    createMachineItem(input: $input) {
      code
      success
      message
      machineItem {
        id
        name
        quantity
        machine {
          id
          name
        }
        item {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_MACHINE_ITEMS = gql`
  mutation UpdateMachineItems($input: UpdateMachineItemsInput!) {
    updateMachineItems(input: $input) {
      code
      success
      message
      machineItems {
        id
        name
        quantity
        machine {
          id
          name
        }
        item {
          id
          name
        }
      }
    }
  }
`;
