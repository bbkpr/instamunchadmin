import { gql } from '@apollo/client';

export const CREATE_MACHINE_LOCATION = gql`
  mutation CreateMachineLocation($input: CreateMachineLocationInput!) {
    createMachineLocation(input: $input) {
      code
      success
      message
      machineLocation {
        id
        name
        machineId
        locationId
        createdAt
        updatedAt
        machine {
          id
          name
          createdAt
          updatedAt
        }
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

export const GET_MACHINE_LOCATIONS = gql`
  query GetMachineLocations {
    getMachineLocations {
      id
      tenantId
      name
      machineId
      machine {
        id
        tenantId
        name
        createdAt
        updatedAt
      }
      locationId
      location {
        id
        tenantId
        address1
        address2
        city
        stateOrProvince
        country
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_MACHINE_LOCATION = gql`
  mutation UpdateMachineLocation($input: UpdateMachineLocationInput!) {
    updateMachineLocation(input: $input) {
      code
      success
      message
      machineLocation {
        id
        tenantId
        name
        machineId
        locationId
        createdAt
        updatedAt
        machine {
          id
          tenantId
          name
          createdAt
          updatedAt
        }
        location {
          id
          tenantId
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

export const DELETE_MACHINE_LOCATION = gql`
  mutation DeleteMachineLocation($id: ID!) {
    deleteMachineLocation(id: $id) {
      code
      success
      message
    }
  }
`;
