import { useEffect, useMemo, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Table, TableRowType } from './Table';

const headers = [{ label: 'Company' }, { label: 'Contact' }, { label: 'Country' }];

const rows: TableRowType[] = [
  {
    id: 'row-1',
    items: [
      { label: 'Alfreds Futterkiste' },
      { label: 'Maria Anders' },
      { label: 'Germany' },
    ],
    isIndeterminate: true,
  },
  {
    id: 'row-2',
    items: [
      { label: 'Centro comercial Moctezuma' },
      { label: 'Francisco Chang' },
      { label: 'Mexico' },
    ],
  },
  {
    id: 'row-3',
    isActive: true,
    items: [
      { label: 'Alfreds Futterkiste' },
      { label: 'Maria Anders' },
      { label: 'Germany' },
    ],
  },
  {
    id: 'row-4',
    isDeleted: true,
    items: [
      { label: 'Centro comercial Moctezuma' },
      { label: 'Francisco Chang' },
      { label: 'Mexico' },
    ],
  },
];

const rowsLongText: TableRowType[] = [
  {
    id: 'row-1',
    items: [
      {
        label:
          'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv',
      },
      { label: 'system.query_log' },
      { label: '2024-01-15 14:32:01' },
    ],
  },
  {
    id: 'row-2',
    items: [
      {
        label:
          'console.clickhouse.cloud_Export.15-03-2024.analytics-events-production-02.parquet',
      },
      { label: 'default.events_local_v2_replica' },
      { label: '2024-01-15 14:28:45' },
    ],
  },
  {
    id: 'row-3',
    items: [
      {
        label:
          'console.clickhouse.cloud_Backup.28-02-2024.user-sessions-aggregated-daily-03.csv.gz',
      },
      { label: 'analytics.page_views_aggregated_daily_mv' },
      { label: '2024-01-15 14:25:12' },
    ],
  },
  {
    id: 'row-4',
    items: [{ label: 'data.csv' }, { label: 'users' }, { label: '2024-01-15 14:20:00' }],
  },
];

const rowsLongTextTruncated: TableRowType[] = [
  {
    id: 'row-1',
    items: [
      {
        label:
          'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv',
        overflowMode: 'truncated',
      },
      { label: 'system.query_log' },
      { label: '2024-01-15 14:32:01' },
    ],
  },
  {
    id: 'row-2',
    items: [
      {
        label:
          'console.clickhouse.cloud_Export.15-03-2024.analytics-events-production-02.parquet',
        overflowMode: 'truncated',
      },
      { label: 'default.events_local_v2_replica' },
      { label: '2024-01-15 14:28:45' },
    ],
  },
  {
    id: 'row-3',
    items: [
      {
        label:
          'console.clickhouse.cloud_Backup.28-02-2024.user-sessions-aggregated-daily-03.csv.gz',
        overflowMode: 'truncated',
      },
      { label: 'analytics.page_views_aggregated_daily_mv' },
      { label: '2024-01-15 14:25:12' },
    ],
  },
  {
    id: 'row-4',
    items: [{ label: 'data.csv' }, { label: 'users' }, { label: '2024-01-15 14:20:00' }],
  },
];

const rowsLongTextTruncatedMiddle: TableRowType[] = [
  {
    id: 'row-1',
    items: [
      {
        label:
          'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv',
        overflowMode: 'truncate-middle',
      },
      { label: 'system.query_log' },
      { label: '2024-01-15 14:32:01' },
    ],
  },
  {
    id: 'row-2',
    items: [
      {
        label:
          'console.clickhouse.cloud_Export.15-03-2024.analytics-events-production-02.parquet',
        overflowMode: 'truncate-middle',
      },
      { label: 'default.events_local_v2_replica' },
      { label: '2024-01-15 14:28:45' },
    ],
  },
  {
    id: 'row-3',
    items: [
      {
        label:
          'console.clickhouse.cloud_Backup.28-02-2024.user-sessions-aggregated-daily-03.csv.gz',
        overflowMode: 'truncate-middle',
      },
      { label: 'analytics.page_views_aggregated_daily_mv' },
      { label: '2024-01-15 14:25:12' },
    ],
  },
  {
    id: 'row-4',
    items: [{ label: 'data.csv' }, { label: 'users' }, { label: '2024-01-15 14:20:00' }],
  },
];

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Display/Table',
  tags: ['table', 'autodocs'],
};

export default meta;

export const Playground: StoryObj<typeof Table> = {
  args: {
    headers,
    rows,
  },
};

export const Selectable: StoryObj<typeof Table> = {
  args: {
    headers,
    rows,
    isSelectable: true,
    selectedIds: [],
  },
  render: ({ selectedIds, rows: rowsProp, ...props }) => {
    const [rows, setRows] = useState(rowsProp);
    const [selectedRows, setSelectedRows] = useState(selectedIds);

    useEffect(() => {
      setSelectedRows(selectedIds);
    }, [selectedIds]);

    useEffect(() => {
      setRows(prevState =>
        prevState.map(row => ({
          ...row,
          isIndeterminate: selectedRows?.includes(row.id) ? false : row.isIndeterminate,
        }))
      );
    }, [selectedRows]);

    return (
      <Table
        {...props}
        rows={rows}
        selectedIds={selectedRows}
        onSelect={selectedItems => {
          setSelectedRows(selectedItems.map(({ item: { id } }) => id));
        }}
      />
    );
  },
};

export const LongText: StoryObj<typeof Table> = {
  args: {
    headers: [{ label: 'File' }, { label: 'Table' }, { label: 'Timestamp' }],
    rows: rowsLongText,
  },
  render: ({ rows, headers, ...props }) => {
    const [sort, setSort] = useState<[number, 'asc' | 'desc']>([0, 'asc']);

    const sortedHeaders = useMemo(
      () =>
        headers.map((header, headerIndex) => ({
          ...header,
          isSortable: true,
          sortDir: sort[0] === headerIndex ? sort[1] : undefined,
        })),
      [headers, sort]
    );

    const sortedRows = useMemo(
      () =>
        [...rows].sort((a, b) => {
          const [cellIdx, sortDir] = sort;
          const cellA = a.items[cellIdx]?.label?.toString() || '';
          const cellB = b.items[cellIdx]?.label?.toString() || '';
          const result = cellA.localeCompare(cellB, 'en', { numeric: true });
          return sortDir === 'asc' ? result : -result;
        }),
      [rows, sort]
    );

    return (
      <Table
        {...props}
        headers={sortedHeaders}
        rows={sortedRows}
        onSort={(dir, _, idx) => void setSort([idx, dir])}
      />
    );
  },
};

export const LongTextTruncated: StoryObj<typeof Table> = {
  args: {
    headers: [{ label: 'File' }, { label: 'Table' }, { label: 'Timestamp' }],
    rows: rowsLongTextTruncated,
  },
  render: ({ rows, headers, ...props }) => {
    const [sort, setSort] = useState<[number, 'asc' | 'desc']>([0, 'asc']);

    const sortedHeaders = useMemo(
      () =>
        headers.map((header, headerIndex) => ({
          ...header,
          isSortable: true,
          sortDir: sort[0] === headerIndex ? sort[1] : undefined,
        })),
      [headers, sort]
    );

    const sortedRows = useMemo(
      () =>
        [...rows].sort((a, b) => {
          const [cellIdx, sortDir] = sort;
          const cellA = a.items[cellIdx]?.label?.toString() || '';
          const cellB = b.items[cellIdx]?.label?.toString() || '';
          const result = cellA.localeCompare(cellB, 'en', { numeric: true });
          return sortDir === 'asc' ? result : -result;
        }),
      [rows, sort]
    );

    return (
      <Table
        {...props}
        headers={sortedHeaders}
        rows={sortedRows}
        onSort={(dir, _, idx) => void setSort([idx, dir])}
      />
    );
  },
};

export const LongTextTruncatedMiddle: StoryObj<typeof Table> = {
  args: {
    headers: [{ label: 'File' }, { label: 'Table' }, { label: 'Timestamp' }],
    rows: rowsLongTextTruncatedMiddle,
  },
  render: ({ rows, headers, ...props }) => {
    const [sort, setSort] = useState<[number, 'asc' | 'desc']>([0, 'asc']);

    const sortedHeaders = useMemo(
      () =>
        headers.map((header, headerIndex) => ({
          ...header,
          isSortable: true,
          sortDir: sort[0] === headerIndex ? sort[1] : undefined,
        })),
      [headers, sort]
    );

    const sortedRows = useMemo(
      () =>
        [...rows].sort((a, b) => {
          const [cellIdx, sortDir] = sort;
          const cellA = a.items[cellIdx]?.label?.toString() || '';
          const cellB = b.items[cellIdx]?.label?.toString() || '';
          const result = cellA.localeCompare(cellB, 'en', { numeric: true });
          return sortDir === 'asc' ? result : -result;
        }),
      [rows, sort]
    );

    return (
      <Table
        {...props}
        headers={sortedHeaders}
        rows={sortedRows}
        onSort={(dir, _, idx) => void setSort([idx, dir])}
      />
    );
  },
};

export const Sortable: StoryObj<typeof Table> = {
  args: {
    headers,
    rows,
  },
  render: ({ rows, headers, ...props }) => {
    const [sort, setSort] = useState<[number, 'asc' | 'desc']>([0, 'asc']);

    const sortedHeaders = useMemo(
      () =>
        headers.map((header, headerIndex) => ({
          ...header,
          isSortable: true,
          sortDir: sort[0] === headerIndex ? sort[1] : undefined,
        })),
      [headers, sort]
    );

    const sortedRows = useMemo(
      () =>
        [...rows].sort((a, b) => {
          const [cellIdx, sortDir] = sort;
          const cellA = a.items[cellIdx]?.label?.toString() || '';
          const cellB = b.items[cellIdx]?.label?.toString() || '';
          const result = cellA.localeCompare(cellB, 'en', { numeric: true });
          return sortDir === 'asc' ? result : -result;
        }),
      [rows, sort]
    );

    return (
      <Table
        {...props}
        headers={sortedHeaders}
        rows={sortedRows}
        onSort={(dir, _, idx) => void setSort([idx, dir])}
      />
    );
  },
};

const rowsHeaderOverflow: TableRowType[] = [
  {
    id: 'row-1',
    items: [
      {
        label:
          'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv',
      },
      { label: 'system.query_log_with_additional_long_table_name_suffix' },
      { label: '2024-01-15 14:32:01' },
    ],
  },
  {
    id: 'row-2',
    items: [
      {
        label:
          'console.clickhouse.cloud_Export.15-03-2024.analytics-events-production-02.parquet',
      },
      { label: 'default.events_local_v2_replica_with_extended_name' },
      { label: '2024-01-15 14:28:45' },
    ],
  },
  {
    id: 'row-3',
    items: [
      {
        label:
          'console.clickhouse.cloud_Backup.28-02-2024.user-sessions-aggregated-daily-03.csv.gz',
        overflowMode: 'truncated',
      },
      { label: 'analytics.page_views_aggregated_daily_mv_extended' },
      { label: '2024-01-15 14:25:12' },
    ],
  },
  {
    id: 'row-4',
    items: [{ label: 'data.csv' }, { label: 'users' }, { label: '2024-01-15 14:20:00' }],
  },
];

type OverflowMode = 'truncated' | 'truncate-middle' | 'wrap';

const overflowModeOptions: OverflowMode[] = ['truncated', 'truncate-middle', 'wrap'];

interface HeaderOverflowModeArgs {
  fileOverflowMode: OverflowMode;
  tableOverflowMode: OverflowMode;
  timestampOverflowMode: OverflowMode;
  rows: TableRowType[];
}

export const ColumnLevelTruncation: StoryObj<HeaderOverflowModeArgs> = {
  argTypes: {
    fileOverflowMode: {
      control: 'select',
      options: overflowModeOptions,
      description: 'Overflow mode for the File column',
      table: { category: 'Column Overflow Modes' },
    },
    tableOverflowMode: {
      control: 'select',
      options: overflowModeOptions,
      description: 'Overflow mode for the Table column',
      table: { category: 'Column Overflow Modes' },
    },
    timestampOverflowMode: {
      control: 'select',
      options: overflowModeOptions,
      description: 'Overflow mode for the Timestamp column',
      table: { category: 'Column Overflow Modes' },
    },
  },
  args: {
    fileOverflowMode: 'truncate-middle',
    tableOverflowMode: 'truncated',
    timestampOverflowMode: 'wrap',
    rows: rowsHeaderOverflow,
  },
  render: ({ fileOverflowMode, tableOverflowMode, timestampOverflowMode, rows }) => {
    const headersWithOverflowMode = [
      { label: 'File', overflowMode: fileOverflowMode },
      { label: 'Table', overflowMode: tableOverflowMode },
      { label: 'Timestamp', overflowMode: timestampOverflowMode },
    ];

    return (
      <Table
        headers={headersWithOverflowMode}
        rows={rows}
      />
    );
  },
};

export const resizableColumns: StoryObj<typeof Table> = {
  args: {
    headers: [{ label: 'File' }, { label: 'Table' }, { label: 'Timestamp' }],
    rows: rowsLongText,
  },
  render: ({ rows, headers, ...props }) => {

    return (
      <Table
        {...props}
        headers={headers}
        rows={rows}
        resizableColumns
      />
    );
  },
};
