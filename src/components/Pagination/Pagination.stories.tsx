import { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Pagination } from '@/components/Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Display/Pagination',
  tags: ['pagination', 'autodocs'],
  render: ({ currentPage: currentPageProp = 1, totalPages = 10, ...args }) => {
    const [currentPage, setCurrentPage] = useState<number>(currentPageProp);
    useEffect(() => {
      setCurrentPage(currentPageProp);
    }, [currentPageProp]);

    const handleChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handleChange}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};
