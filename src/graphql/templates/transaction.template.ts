import { gql } from '@apollo/client';

export const GET_MACHINE_TRANSACTIONS = gql`
  query GetMachineTransactions($machineId: ID!) {
    getMachineTransactions(machineId: $machineId) {
      id
      amount
      method
      type
      createdAt
      notes
      item {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;

export const GET_MACHINE_CASH_COLLECTIONS = gql`
  query GetMachineCashCollections($machineId: ID!) {
    getMachineCashCollections(machineId: $machineId) {
      id
      amount
      collectedAt
      notes
      user {
        id
        name
      }
    }
  }
`;

export const RECORD_TRANSACTION = gql`
  mutation RecordTransaction($input: RecordTransactionInput!) {
    recordTransaction(input: $input) {
      id
      amount
      method
      type
      createdAt
      notes
      item {
        id
        name
      }
      machine {
        id
        cashOnHand
      }
    }
  }
`;

export const RECORD_CASH_COLLECTION = gql`
  mutation RecordCashCollection($input: RecordCashCollectionInput!) {
    recordCashCollection(input: $input) {
      id
      amount
      collectedAt
      notes
      user {
        id
        name
      }
      machine {
        id
        cashOnHand
      }
    }
  }
`;
