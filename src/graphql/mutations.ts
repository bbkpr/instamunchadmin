// graphql/mutations.ts
import { gql } from '@apollo/client';

export const UPDATE_MACHINE_ITEMS = gql`
  mutation UpdateMachineItems($input: UpdateMachineItemsInput!) {
    updateMachineItems(input: $input) {
      code
      success
      message
      machineItems {
        id
        name
        quantity
        item {
          id
          name
        }
      }
    }
  }
`;
