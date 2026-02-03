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

export const Playground: Story = {
  args: {
    currentPage: 1,
  },
  render: () => <PaginationRenderer />,
};
