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
      machineItems {
        id
        name
        quantity
        itemId
        machineId
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
      machine {
        id
        name
        createdAt
        updatedAt
      }
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
        basePrice
        expirationPeriod
        createdAt
        updatedAt
        machineItems {
          id
          itemId
          name
          quantity
          machineId
          machine {
            id
            name
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
