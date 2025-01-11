import { gql } from '@apollo/client';

export const CREATE_LOCATION = gql`
  mutation CreateLocation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      code
      success
      message
      location {
        id
        address1
        address2
        city
        stateOrProvince
        postalCode
        country
        createdAt
        updatedAt
        machineLocations {
          id
          name
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

export const GET_LOCATIONS = gql`
  query GetLocations {
    getLocations {
      id
      address1
      address2
      city
      stateOrProvince
      postalCode
      country
      createdAt
      updatedAt
      machineLocations {
        id
        name
        machineId
        machine {
          id
          name
          createdAt
          updatedAt
        }
        locationId
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation UpdateLocation($input: UpdateLocationInput!) {
    updateLocation(input: $input) {
      code
      success
      message
      location {
        id
        address1
        address2
        city
        stateOrProvince
        postalCode
        country
        createdAt
        updatedAt
        machineLocations {
          id
          name
          machine {
            id
            name
          }
        }
      }
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id) {
      code
      success
      message
    }
  }
`;
