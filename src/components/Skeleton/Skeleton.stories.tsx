import { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '@/components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'Display/Skeleton',
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div
        data-testid="skeleton-harness"
        style={{ width: '320px', height: '120px', padding: '1rem' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  args: {
    shape: 'text',
    size: 'md',
    lines: 1,
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const TextLines: Story = {
  args: { lines: 3 },
};

export const TextWidth: Story = {
  args: { width: '60%' },
};

export const Rectangle: Story = {
  args: { shape: 'rectangle' },
};

export const RectangleSize: Story = {
  args: { shape: 'rectangle', width: '4rem', height: '4rem' },
};
