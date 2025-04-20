// src/graphql/templates/auth.template.ts
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      code
      success
      message
      token
      user {
        id
        tenantId
        email
        name
        role
      }
    }
  }
`;
