import { Meta, StoryObj } from '@storybook/react-vite';
import { Spacer } from '@/components/Spacer';

const meta: Meta<typeof Spacer> = {
  component: Spacer,
  title: 'Display/Spacer',
  tags: ['spacer', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Playground: Story = {
  args: {
    size: 'xxl',
  },
};
