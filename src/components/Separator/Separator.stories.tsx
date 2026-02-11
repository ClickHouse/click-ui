import { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'Display/Separator',
  tags: ['separator', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Playground: Story = {
  args: {
    size: 'xs',
    orientation: 'horizontal',
  },
};
