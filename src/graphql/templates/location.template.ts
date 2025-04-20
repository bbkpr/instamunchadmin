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
      tenantId
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
        tenantId
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
          tenantId
          name
          machine {
            id
            tenantId
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
