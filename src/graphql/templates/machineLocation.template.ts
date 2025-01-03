import { gql } from '@apollo/client';

export const GET_MACHINE_LOCATIONS = gql`
  query GetMachineLocations {
    getMachineLocations {
      id
      name
      machineId
      locationId
      createdAt
      updatedAt
      machine {
        id
        name
      }
      location {
        id
        name
        address1
        city
      }
    }
  }
`;

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
        machine {
          id
          name
        }
        location {
          id
          address1
          city
        }
      }
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
        name
        machineId
        locationId
        machine {
          id
          name
        }
        location {
          id
          address1
          city
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
