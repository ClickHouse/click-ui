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

/** Matches issue #1008: row count + page controls in one row at narrow widths */
export const NarrowLayout: Story = {
  decorators: [
    Story => (
      <div
        style={{
          width: 360,
          maxWidth: '100%',
          padding: 16,
          boxSizing: 'border-box',
          border: '1px solid #e4e7ec',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: function NarrowLayoutRender() {
    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
      <Pagination
        currentPage={currentPage}
        onChange={setCurrentPage}
        totalPages={2}
        rowCount={19}
      />
    );
  },
};
