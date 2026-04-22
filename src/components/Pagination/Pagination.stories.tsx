import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from '@/components/Pagination';

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

const PaginationResponsiveLayoutRenderer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(-1);

  return (
    <Pagination
      currentPage={currentPage}
      onChange={setCurrentPage}
      onPageSizeChange={setPageSize}
      pageSize={pageSize}
      totalPages={2}
      rowCount={19}
      maxRowsPerPageList={[10, 25, 50]}
      allowAllRows={false}
    />
  );
};

export const Playground: Story = {
  args: {
    currentPage: 1,
  },
  render: () => <PaginationRenderer />,
};

export const ResponsiveLayoutPreview: Story = {
  render: () => <PaginationResponsiveLayoutRenderer />,
};
