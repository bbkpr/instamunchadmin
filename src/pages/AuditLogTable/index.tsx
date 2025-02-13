import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  SortingState
} from '@tanstack/react-table';
import { Table, Pagination, Form, Spinner, Container } from 'react-bootstrap';
import { formatEnumValue } from '@/utils/formatters';
import { GET_AUDIT_LOGS } from '@/graphql/templates/auditLog.template';
import { ExpandableJSON } from '@/components/ExpandableJSON';

interface AuditLogEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface AuditLogFilter {
  entityType?: string;
  action?: string;
  userId?: string;
  fromDate?: string;
  toDate?: string;
}

export function AuditLogTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 100
  });

  const [sorting, setSorting] = useState<SortingState>([{ desc: true, id: 'createdAt' }]);
  const [filter, setFilter] = useState<AuditLogFilter>({});

  const { data, loading, error } = useQuery(GET_AUDIT_LOGS, {
    variables: {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sortBy: sorting[0]?.id,
      sortOrder: !sorting[0]?.desc ? 'asc' : 'desc',
      filter
    }
  });

  const columnHelper = createColumnHelper<AuditLogEntry>();

  const columns = [
    // columnHelper.accessor(row => row.user?.id, {
    //   header: 'User Id',
    //   cell: (info) => info.getValue() || '?'
    // }),
    columnHelper.accessor('createdAt', {
      header: 'When',
      cell: (info) =>
        `${new Date(info.getValue()).toLocaleDateString()} ${new Date(info.getValue()).toLocaleTimeString()}`
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: (info) => formatEnumValue(info.getValue())
    }),
    columnHelper.accessor('entityType', {
      header: 'Entity Type',
      cell: (info) => formatEnumValue(info.getValue())
    }),
    columnHelper.accessor('field', {
      header: 'Field',
      cell: (info) => info.getValue() || '-'
    }),
    columnHelper.accessor((row) => row.user?.name, {
      id: 'user',
      header: 'User',
      cell: (info) => info.getValue() || 'System'
    }),
    columnHelper.accessor('oldValue', {
      header: 'Old Value',
      cell: (info) => {
        const value = info.getValue();
        if (!value) return '-';
        return <ExpandableJSON value={value} />;
      }
    }),
    columnHelper.accessor('newValue', {
      header: 'New Value',
      cell: (info) => {
        const value = info.getValue();
        if (!value) return '-';
        return <ExpandableJSON value={value} />;
      }
    })
  ];

  const table = useReactTable({
    data: data?.getAuditLogs.logs ?? [],
    columns,
    pageCount: data?.getAuditLogs.pageCount ?? -1,
    state: {
      pagination,
      sorting
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    sortDescFirst: true
  });

  if (error) {
    return (
      <Container className="py-4">
        <div className="alert alert-danger">Error loading audit logs: {error.message}</div>
      </Container>
    );
  }

  return (
    <Container className="py-4" fluid>
      {/* Filters */}
      <div className="mb-3 d-flex gap-3">
        <Form.Group style={{ width: '200px' }}>
          <Form.Label>Entity Type</Form.Label>
          <Form.Select
            value={filter.entityType || ''}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                entityType: e.target.value || undefined
              }))
            }
          >
            <option value="">All Entity Types</option>
            <option value="Item">Item</option>
            <option value="Location">Location</option>
            <option value="Machine">Machine</option>
            <option value="MachineItem">Machine Item</option>
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ width: '200px' }}>
          <Form.Label>Action</Form.Label>
          <Form.Select
            value={filter.action || ''}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                action: e.target.value || undefined
              }))
            }
          >
            <option value="">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ width: '200px' }}>
          <Form.Label>From Date</Form.Label>
          <Form.Control
            type="date"
            value={filter.fromDate || ''}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                fromDate: e.target.value || undefined
              }))
            }
          />
        </Form.Group>

        <Form.Group style={{ width: '200px' }}>
          <Form.Label>To Date</Form.Label>
          <Form.Control
            type="date"
            value={filter.toDate || ''}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                toDate: e.target.value || undefined
              }))
            }
          />
        </Form.Group>
      </div>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={{ cursor: 'pointer' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽'
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                <Spinner animation="border" />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          )}
          {!loading && table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span>Rows per page:</span>
          <Form.Select
            size="sm"
            value={pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            style={{ width: 'auto' }}
          >
            {[100, 250, 500].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Form.Select>
          <span className="ms-3">Total: {data?.getAuditLogs.totalCount ?? 0} records</span>
        </div>

        <Pagination>
          <Pagination.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} />
          <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
          <Pagination.Item active>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Pagination.Item>
          <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
          <Pagination.Last
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
        </Pagination>
      </div>
    </Container>
  );
}
