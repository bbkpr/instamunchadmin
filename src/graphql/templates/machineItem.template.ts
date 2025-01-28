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
        setPrice
        machineId
        machine {
          id
          name
          createdAt
          updatedAt
        }
        itemId
        item {
          id
          name
          basePrice
          expirationPeriod
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const DELETE_MACHINE_ITEM = gql`
  mutation DeleteMachineItem($id: ID!) {
    deleteMachineItem(id: $id) {
      code
      success
      message
    }
  }
`;

export const UPDATE_MACHINE_ITEM = gql`
  mutation UpdateMachineItem($input: UpdateMachineItemInput!) {
    updateMachineItem(input: $input) {
      code
      success
      message
      machineItem {
        id
        name
        quantity
        setPrice
        itemId
        item {
          id
          name
          basePrice
          expirationPeriod
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
        machineId
        machine {
          id
          name
        }
        itemId
        item {
          id
          name
          basePrice
          expirationPeriod
        }
      }
    }
  }
`;
