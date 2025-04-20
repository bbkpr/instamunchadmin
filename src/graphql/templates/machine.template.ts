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
        tenantId
        machineType {
          id
          tenantId
          name
          createdAt
          updatedAt
        }
        manufacturer {
          id
          tenantId
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_MACHINE = gql`
  query GetMachine($id: ID!) {
    getMachine(machineId: $id) {
      id
      name
      createdAt
      updatedAt
      tenantId
      machineType {
        id
        tenantId
        name
      }
      manufacturer {
        id
        tenantId
        name
      }
      machineItems {
        id
        tenantId
        name
        quantity
        setPrice
        item {
          id
          tenantId
          name
          basePrice
          expirationPeriod
        }
      }
      machineLocations {
        id
        tenantId
        name
        location {
          id
          address1
          address2
          city
          stateOrProvince
          postalCode
          country
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
      tenantId
      machineType {
        id
        tenantId
        name
        createdAt
        updatedAt
      }
      manufacturer {
        id
        tenantId
        name
        createdAt
        updatedAt
      }
      machineItems {
        id
        tenantId
        name
        quantity
        setPrice
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
      machineLocations {
        id
        tenantId
        name
        location {
          id
          tenantId
          address1
          address2
          city
          stateOrProvince
          postalCode
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
        tenantId
        name
        createdAt
        updatedAt
        machineItems {
          id
          tenantId
          name
          quantity
          setPrice
          machineId
          itemId
          item {
            id
            tenantId
            name
            basePrice
            createdAt
            updatedAt
          }
        }
        machineLocations {
          id
          tenantId
          name
          machineId
          locationId
          location {
            id
            tenantId
            address1
            address2
            city
            stateOrProvince
            postalCode
            country
            createdAt
            updatedAt
          }
        }
        machineType {
          id
          tenantId
          name
          createdAt
          updatedAt
          manufacturerId
        }
        manufacturer {
          id
          tenantId
          name
          createdAt
          updatedAt
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
