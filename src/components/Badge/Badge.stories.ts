import { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Display/Badge',
  tags: ['badge', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    text: 'experiment',
    state: 'success',
    size: 'md',
    type: 'opaque',
  },
};
