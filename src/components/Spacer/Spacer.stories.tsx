import { Meta, StoryObj } from '@storybook/react-vite';
import { Spacer } from '@/components/Spacer';

const meta: Meta<typeof Spacer> = {
  component: Spacer,
  title: 'Display/Spacer',
  tags: ['spacer', 'autodocs'],
  // Spacer is invisible on its own, so the decorator sandwiches it between two
  // contrasting bars to make its effect measurable in the snapshot.
  decorators: [
    Story => (
      <div
        data-testid="spacer-harness"
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '160px',
          background: '#888',
        }}
      >
        <div style={{ height: '24px', background: '#222' }} />
        <Story />
        <div style={{ height: '24px', background: '#222' }} />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Playground: Story = {
  args: {
    size: 'xxl',
  },
};

export const SizeXs: Story = {
  args: { size: 'xs' },
};

export const SizeSm: Story = {
  args: { size: 'sm' },
};

export const SizeMd: Story = {
  args: { size: 'md' },
};

export const SizeLg: Story = {
  args: { size: 'lg' },
};

export const SizeXl: Story = {
  args: { size: 'xl' },
};

export const SizeXxl: Story = {
  args: { size: 'xxl' },
};

export const DefaultSize: Story = {};
