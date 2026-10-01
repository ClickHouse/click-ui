import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from '@/components/Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Display/Pagination',
  tags: ['pagination', 'autodocs'],
  decorators: [
    Story => (
      <div
        data-testid="pagination-harness"
        style={{ display: 'block', width: '520px', padding: '8px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const noop = () => {};

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

export const Playground: Story = {
  args: {
    currentPage: 1,
  },
  render: () => <PaginationRenderer />,
};

export const Basic: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    onChange: noop,
  },
};

export const WithRowCount: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    rowCount: 200,
    onChange: noop,
  },
};

export const WithPageSizes: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    maxRowsPerPageList: [250, 500],
    onChange: noop,
  },
};

export const Full: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    rowCount: 12345,
    maxRowsPerPageList: [250, 500],
    onChange: noop,
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onChange: noop,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onChange: noop,
  },
};
