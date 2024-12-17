// graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_MACHINES = gql`
    query GetMachines {
        getMachines {
            id
            name
            machineType {
                id
                name
            }
            manufacturer {
                id
                name
            }
            machineItems {
                id
                name
                quantity
                item {
                    id
                    name
                    basePrice
                }
            }
        }
    }
`;

export const GET_ITEMS = gql`
    query GetItems {
        getItems {
            id
            name
            basePrice
            expirationPeriod
        }
    }
`;

export const GET_MACHINE_TYPES = gql`
    query GetMachineTypes {
        getMachineTypes {
            id
            name
        }
    }
`;

export const GET_MACHINE_MANUFACTURERS = gql`
    query GetMachineManufacturers {
        getMachineManufacturers {
            id
            name
        }
    }
`;