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
        style={{ width: '320px', padding: '1rem' }}
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
    size: 'md',
    width: '100%',
  },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const CustomSize: Story = {
  args: { width: '4rem', height: '4rem' },
};

export const TextLines: Story = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Skeleton
        {...args}
        width="60%"
      />
      <Skeleton {...args} />
      <Skeleton
        {...args}
        width="80%"
      />
    </div>
  ),
};
