import { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Pagination } from '@/components/Pagination';
import { agentDebugLog } from '@/utils/agentDebugLog';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Display/Pagination',
  tags: ['pagination', 'autodocs'],
  render: ({ currentPage: currentPageProp = 1, totalPages = 10, ...args }) => {
    const [currentPage, setCurrentPage] = useState<number>(currentPageProp);
    useEffect(() => {
      setCurrentPage(currentPageProp);
    }, [currentPageProp]);

    // #region agent log
    agentDebugLog({
      hypothesisId: 'H1',
      location: 'Pagination.stories.tsx:12',
      message: 'Pagination story render entry',
      data: { currentPageProp, currentPage, totalPages },
      timestamp: Date.now(),
    });
    // #endregion

    const handleChange = (page: number) => {
      // #region agent log
      agentDebugLog({
        hypothesisId: 'H2',
        location: 'Pagination.stories.tsx:24',
        message: 'Pagination story handleChange called',
        data: { previousPage: currentPage, nextPage: page },
        timestamp: Date.now(),
      });
      // #endregion

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
