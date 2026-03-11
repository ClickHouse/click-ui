import { useEffect, useMemo, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Table, TableRowType, TableColumnConfigProps } from '@/components/Table';

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
    headers: [
      { label: 'File', width: '200px' },
      { label: 'Table', width: '200px' },
      { label: 'Timestamp', width: '180px' },
      { label: 'Size', width: '100px' },
      { label: 'Status', width: '120px' },
    ],
    rows: [
      {
        id: 'row-1',
        items: [
          { label: 'archive-2024-01-15.csv' },
          { label: 'system.query_log' },
          { label: '2024-01-15 14:32:01' },
          { label: '1.2 GB' },
          { label: 'Completed' },
        ],
      },
      {
        id: 'row-2',
        items: [
          { label: 'export-analytics.parquet' },
          { label: 'default.events' },
          { label: '2024-01-15 14:28:45' },
          { label: '856 MB' },
          { label: 'In Progress' },
        ],
      },
    ],
    mobileLayout: 'list',
  },
  render: ({ mobileLayout, ...props }) => {
    return (
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          mobileLayout={mobileLayout}
        />
      </div>
    );
  },
};

export const Selectable: StoryObj<typeof Table> = {
  args: {
    headers: [
      { label: 'File', width: '200px' },
      { label: 'Table', width: '200px' },
      { label: 'Timestamp', width: '180px' },
      { label: 'Size', width: '100px' },
      { label: 'Status', width: '120px' },
    ],
    rows: [
      {
        id: 'row-1',
        items: [
          { label: 'archive-2024-01-15.csv' },
          { label: 'system.query_log' },
          { label: '2024-01-15 14:32:01' },
          { label: '1.2 GB' },
          { label: 'Completed' },
        ],
        isIndeterminate: true,
      },
      {
        id: 'row-2',
        items: [
          { label: 'export-analytics.parquet' },
          { label: 'default.events' },
          { label: '2024-01-15 14:28:45' },
          { label: '856 MB' },
          { label: 'In Progress' },
        ],
      },
    ],
    isSelectable: true,
    selectedIds: [],
    mobileLayout: 'list',
  },
  render: ({ selectedIds, rows: rowsProp, mobileLayout, ...props }) => {
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
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          rows={rows}
          selectedIds={selectedRows}
          mobileLayout={mobileLayout}
          onSelect={selectedItems => {
            setSelectedRows(selectedItems.map(({ item: { id } }) => id));
          }}
        />
      </div>
    );
  },
};

export const LongText: StoryObj<typeof Table> = {
  args: {
    headers: [{ label: 'File' }, { label: 'Table' }, { label: 'Timestamp' }],
    rows: rowsLongText,
    mobileLayout: 'list',
  },
  render: ({ rows, headers, mobileLayout, ...props }) => {
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
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          headers={sortedHeaders}
          rows={sortedRows}
          mobileLayout={mobileLayout}
          onSort={(dir, _, idx) => void setSort([idx, dir])}
        />
      </div>
    );
  },
};

export const LongTextTruncated: StoryObj<typeof Table> = {
  args: {
    headers: [{ label: 'File' }, { label: 'Table' }, { label: 'Timestamp' }],
    rows: rowsLongTextTruncated,
    mobileLayout: 'list',
  },
  render: ({ rows, headers, mobileLayout, ...props }) => {
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
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          headers={sortedHeaders}
          rows={sortedRows}
          mobileLayout={mobileLayout}
          onSort={(dir, _, idx) => void setSort([idx, dir])}
        />
      </div>
    );
  },
};

export const LongTextTruncatedMiddle: StoryObj<typeof Table> = {
  args: {
    headers: [{ label: 'File' }, { label: 'Table' }, { label: 'Timestamp' }],
    rows: rowsLongTextTruncatedMiddle,
    mobileLayout: 'list',
  },
  render: ({ rows, headers, mobileLayout, ...props }) => {
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
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          headers={sortedHeaders}
          rows={sortedRows}
          mobileLayout={mobileLayout}
          onSort={(dir, _, idx) => void setSort([idx, dir])}
        />
      </div>
    );
  },
};

export const Sortable: StoryObj<typeof Table> = {
  args: {
    headers: [
      { label: 'File', width: '200px' },
      { label: 'Table', width: '200px' },
      { label: 'Timestamp', width: '180px' },
      { label: 'Size', width: '100px' },
      { label: 'Status', width: '120px' },
    ],
    rows: [
      {
        id: 'row-1',
        items: [
          { label: 'archive-2024-01-15.csv' },
          { label: 'system.query_log' },
          { label: '2024-01-15 14:32:01' },
          { label: '1.2 GB' },
          { label: 'Completed' },
        ],
      },
      {
        id: 'row-2',
        items: [
          { label: 'export-analytics.parquet' },
          { label: 'default.events' },
          { label: '2024-01-15 14:28:45' },
          { label: '856 MB' },
          { label: 'In Progress' },
        ],
      },
    ],
    mobileLayout: 'list',
  },
  render: ({ rows, headers, mobileLayout, ...props }) => {
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
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          headers={sortedHeaders}
          rows={sortedRows}
          mobileLayout={mobileLayout}
          onSort={(dir, _, idx) => void setSort([idx, dir])}
        />
      </div>
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

type MobileLayoutProp = 'list' | 'scroll';

interface ColumnLevelTruncationArgs {
  fileOverflowMode: OverflowMode;
  tableOverflowMode: OverflowMode;
  timestampOverflowMode: OverflowMode;
  rows: TableRowType[];
  mobileLayout: MobileLayoutProp;
}

export const ColumnLevelTruncation: StoryObj<ColumnLevelTruncationArgs> = {
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
    mobileLayout: 'list',
  },
  render: ({
    fileOverflowMode,
    tableOverflowMode,
    timestampOverflowMode,
    rows,
    mobileLayout,
  }) => {
    const headersWithOverflowMode = [
      { label: 'File', overflowMode: fileOverflowMode },
      { label: 'Table', overflowMode: tableOverflowMode },
      { label: 'Timestamp', overflowMode: timestampOverflowMode },
    ];

    return (
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          headers={headersWithOverflowMode}
          rows={rows}
          mobileLayout={mobileLayout}
        />
      </div>
    );
  },
};

export const ResizableColumns: StoryObj<typeof Table> = {
  args: {
    headers: [
      { label: 'File', overflowMode: 'truncated' },
      { label: 'Table', overflowMode: 'truncated' },
      { label: 'Timestamp', overflowMode: 'truncated' },
    ],
    rows: rowsLongText,
    mobileLayout: 'list',
  },
  render: ({ rows, headers, mobileLayout, ...props }) => {
    return (
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          headers={headers}
          rows={rows}
          mobileLayout={mobileLayout}
          resizableColumns
        />
      </div>
    );
  },
};

interface ResizableColumnsWithReorderingArgs {
  showName: boolean;
  showEmail: boolean;
  showRole: boolean;
  showDepartment: boolean;
  headers: TableColumnConfigProps[];
  rows: TableRowType[];
  mobileLayout: 'list' | 'scroll';
  resizableColumns: boolean;
}

export const ResizableColumnsWithReordering: StoryObj<ResizableColumnsWithReorderingArgs> =
  {
    argTypes: {
      showName: { control: 'boolean' },
      showEmail: { control: 'boolean' },
      showRole: { control: 'boolean' },
      showDepartment: { control: 'boolean' },
    },
    args: {
      headers: [
        { label: 'Name', overflowMode: 'truncated' },
        { label: 'Email', overflowMode: 'truncated' },
        { label: 'Role', overflowMode: 'truncated' },
        { label: 'Department', overflowMode: 'truncated' },
      ],
      rows: [
        {
          id: 'row-1',
          items: [
            { label: 'Alice Johnson' },
            { label: 'alice@company.com' },
            { label: 'Admin' },
            { label: 'Engineering' },
          ],
        },
        {
          id: 'row-2',
          items: [
            { label: 'Bob Smith' },
            { label: 'bob@company.com' },
            { label: 'User' },
            { label: 'Marketing' },
          ],
        },
      ],
      mobileLayout: 'list',
      resizableColumns: true,
      showName: true,
      showEmail: true,
      showRole: true,
      showDepartment: true,
    },
    render: ({
      rows,
      headers,
      mobileLayout,
      showName,
      showEmail,
      showRole,
      showDepartment,
    }) => {
      const visibleColumnLabels = useMemo(() => {
        const labels: string[] = [];
        if (showName) {
          labels.push('Name');
        }
        if (showEmail) {
          labels.push('Email');
        }
        if (showRole) {
          labels.push('Role');
        }
        if (showDepartment) {
          labels.push('Department');
        }
        return labels;
      }, [showName, showEmail, showRole, showDepartment]);

      const visibleHeaders = useMemo(() => {
        return visibleColumnLabels
          .map(label => headers.find(h => h.label === label))
          .filter(Boolean) as typeof headers;
      }, [visibleColumnLabels, headers]);

      const visibleRows = useMemo(() => {
        return rows.map(row => {
          const newItems = visibleColumnLabels
            .map(label => {
              const index = headers.findIndex(h => h.label === label);
              return row.items[index];
            })
            .filter(Boolean);
          return { ...row, items: newItems };
        });
      }, [rows, visibleColumnLabels, headers]);

      return (
        <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
          <Table
            headers={visibleHeaders}
            rows={visibleRows}
            mobileLayout={mobileLayout}
            resizableColumns
          />
        </div>
      );
    },
  };

export const MobileLayout: StoryObj<typeof Table> = {
  args: {
    headers: [
      { label: 'File', width: '200px' },
      { label: 'Table', width: '200px' },
      { label: 'Timestamp', width: '180px' },
      { label: 'Size', width: '100px' },
      { label: 'Status', width: '120px' },
    ],
    rows: [
      {
        id: 'row-1',
        items: [
          { label: 'archive-2024-01-15.csv' },
          { label: 'system.query_log' },
          { label: '2024-01-15 14:32:01' },
          { label: '1.2 GB' },
          { label: 'Completed' },
        ],
      },
      {
        id: 'row-2',
        items: [
          { label: 'export-analytics.parquet' },
          { label: 'default.events' },
          { label: '2024-01-15 14:28:45' },
          { label: '856 MB' },
          { label: 'In Progress' },
        ],
      },
    ],
    mobileLayout: 'scroll',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `mobileLayout` is set to `"scroll"`, the table maintains its standard layout with horizontal scroll on narrow screens instead of converting to a mobile list view. The default (`mobileLayout="list"`) preserves the responsive mobile list view behavior.',
      },
    },
  },
  render: ({ rows, headers, mobileLayout, ...props }) => {
    return (
      <div style={{ maxWidth: mobileLayout === 'scroll' ? '400px' : 'none' }}>
        <Table
          {...props}
          headers={headers}
          rows={rows}
          mobileLayout={mobileLayout}
        />
      </div>
    );
  },
};
