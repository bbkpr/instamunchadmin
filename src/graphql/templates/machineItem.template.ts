import { gql } from '@apollo/client';

export const CREATE_MACHINE_ITEM = gql`
  mutation CreateMachineItem($input: CreateMachineItemInput!) {
    createMachineItem(input: $input) {
      code
      success
      message
      machineItem {
        id
        tenantId
        name
        quantity
        setPrice
        machineId
        machine {
          id
          tenantId
          name
          createdAt
          updatedAt
        }
        itemId
        item {
          id
          tenantId
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
        tenantId
        name
        quantity
        setPrice
        itemId
        item {
          id
          tenantId
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
        tenantId
        name
        quantity
        machineId
        machine {
          id
          tenantId
          name
        }
        itemId
        item {
          id
          tenantId
          name
          basePrice
          expirationPeriod
        }
      }
    }
  }
`;
