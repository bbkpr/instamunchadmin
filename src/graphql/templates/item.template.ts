import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      name
      basePrice
      expirationPeriod
      createdAt
      updatedAt
      tenantId
      machineItems {
        id
        name
        quantity
        itemId
        machineId
        tenantId
        machine {
          id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_ITEMS_BY_MACHINE = gql`
  query GetItemsByMachine($machineId: ID!) {
    getItemsByMachine(machineId: $machineId) {
      id
      name
      quantity
      tenantId
      machine {
        id
        name
        createdAt
        updatedAt
        tenantId
      }
      item {
        id
        name
        basePrice
        expirationPeriod
        createdAt
        updatedAt
        tenantId
      }
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      code
      success
      message
      item {
        id
        name
        tenantId
        basePrice
        expirationPeriod
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      code
      success
      message
      item {
        id
        name
        tenantId
        basePrice
        expirationPeriod
        createdAt
        updatedAt
        machineItems {
          id
          itemId
          tenantId
          name
          quantity
          machineId
          machine {
            id
            name
            tenantId
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      code
      success
      message
    }
  }
`;
