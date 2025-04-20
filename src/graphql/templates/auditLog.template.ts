import { gql } from '@apollo/client';

export const GET_AUDIT_LOGS = gql`
  query GetAuditLogs($page: Int!, $pageSize: Int!, $sortBy: String, $sortOrder: String, $filter: AuditLogFilter) {
    getAuditLogs(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortOrder: $sortOrder, filter: $filter) {
      logs {
        id
        tenantId
        entityType
        entityId
        action
        field
        oldValue
        newValue
        user {
          id
          name
          email
        }
        createdAt
      }
      totalCount
      pageCount
    }
  }
`;
