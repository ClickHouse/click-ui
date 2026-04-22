import { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
import { Pagination } from '@/components/Pagination';
import {
  Table,
  type TableColumnConfigProps,
  type TableRowType,
} from '@/components/Table';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Display/Pagination',
  tags: ['pagination', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const PaginationRenderer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      onChange={handleChange}
    />
  );
};

const tableHeaders: TableColumnConfigProps[] = [
  { label: 'File', width: '170px' },
  { label: 'Table', width: '170px' },
  { label: 'Timestamp', width: '180px' },
];

const tableRows: TableRowType[] = [
  {
    id: 'row-1',
    items: [
      { label: 'archive-2024-01-15.csv' },
      { label: 'system.query_log' },
      { label: '2024-01-15 14:32:01' },
    ],
  },
  {
    id: 'row-2',
    items: [
      { label: 'export-analytics.parquet' },
      { label: 'default.events' },
      { label: '2024-01-15 14:28:45' },
    ],
  },
  {
    id: 'row-3',
    items: [
      { label: 'user-sessions.csv.gz' },
      { label: 'analytics.sessions' },
      { label: '2024-01-15 14:25:12' },
    ],
  },
  {
    id: 'row-4',
    items: [
      { label: 'page-views.parquet' },
      { label: 'analytics.page_views' },
      { label: '2024-01-15 14:20:00' },
    ],
  },
  {
    id: 'row-5',
    items: [
      { label: 'events-2024-01-14.csv' },
      { label: 'default.events_local' },
      { label: '2024-01-14 18:45:00' },
    ],
  },
  {
    id: 'row-6',
    items: [
      { label: 'orders-jan.parquet' },
      { label: 'sales.orders' },
      { label: '2024-01-14 12:00:00' },
    ],
  },
  {
    id: 'row-7',
    items: [
      { label: 'clickstream.log' },
      { label: 'web.clickstream' },
      { label: '2024-01-14 10:15:20' },
    ],
  },
  {
    id: 'row-8',
    items: [
      { label: 'transactions.csv' },
      { label: 'payments.transactions' },
      { label: '2024-01-14 08:03:11' },
    ],
  },
  {
    id: 'row-9',
    items: [
      { label: 'users-export.csv' },
      { label: 'auth.users' },
      { label: '2024-01-13 22:09:48' },
    ],
  },
  {
    id: 'row-10',
    items: [
      { label: 'errors.ndjson' },
      { label: 'monitoring.errors' },
      { label: '2024-01-13 21:44:01' },
    ],
  },
  {
    id: 'row-11',
    items: [
      { label: 'ad-impressions.csv' },
      { label: 'marketing.impressions' },
      { label: '2024-01-13 20:30:33' },
    ],
  },
  {
    id: 'row-12',
    items: [
      { label: 'subscriptions.parquet' },
      { label: 'billing.subscriptions' },
      { label: '2024-01-13 19:10:07' },
    ],
  },
  {
    id: 'row-13',
    items: [
      { label: 'shipments.csv' },
      { label: 'logistics.shipments' },
      { label: '2024-01-13 17:52:29' },
    ],
  },
  {
    id: 'row-14',
    items: [
      { label: 'inventory-delta.csv' },
      { label: 'warehouse.inventory' },
      { label: '2024-01-13 16:05:44' },
    ],
  },
  {
    id: 'row-15',
    items: [
      { label: 'audit-trail.log' },
      { label: 'security.audit_trail' },
      { label: '2024-01-13 14:11:59' },
    ],
  },
  {
    id: 'row-16',
    items: [
      { label: 'metrics-hourly.csv' },
      { label: 'monitoring.metrics' },
      { label: '2024-01-13 12:26:14' },
    ],
  },
  {
    id: 'row-17',
    items: [
      { label: 'orders-failed.csv' },
      { label: 'sales.orders_failed' },
      { label: '2024-01-13 11:40:23' },
    ],
  },
  {
    id: 'row-18',
    items: [
      { label: 'cart-events.json' },
      { label: 'web.cart_events' },
      { label: '2024-01-13 10:05:51' },
    ],
  },
  {
    id: 'row-19',
    items: [
      { label: 'feature-flags.csv' },
      { label: 'config.feature_flags' },
      { label: '2024-01-13 09:12:18' },
    ],
  },
];

const PaginationResponsiveLayoutRenderer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const totalRows = tableRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visibleRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableRows.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

  return (
    <>
      <Table
        headers={tableHeaders}
        rows={visibleRows}
        mobileLayout="scroll"
      />
      <Pagination
        currentPage={currentPage}
        onChange={setCurrentPage}
        onPageSizeChange={value => {
          setPageSize(value);
          setCurrentPage(1);
        }}
        pageSize={pageSize}
        totalPages={totalPages}
        rowCount={totalRows}
        maxRowsPerPageList={[10, 25, 50]}
        allowAllRows={false}
      />
    </>
  );
};

export const Playground: Story = {
  args: {
    currentPage: 1,
  },
  render: () => <PaginationRenderer />,
};

export const ResponsiveLayoutPreview: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Responsive preview rendered in a mobile viewport with a table and pagination. Pagination layout should remain in a single horizontal row just like desktop.',
      },
    },
  },
  render: () => <PaginationResponsiveLayoutRenderer />,
};
