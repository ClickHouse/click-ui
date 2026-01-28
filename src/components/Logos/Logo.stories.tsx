import { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';
import LogosLight from './LogosLight';

const meta: Meta<typeof Logo> = {
  component: Logo,
  title: 'Display/Logo',
  tags: ['LOGO', 'autodocs'],
  argTypes: {
    name: {
      options: Object.keys(LogosLight),
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Playground: Story = {
  args: {
    name: 'aws',
    width: '32px',
    height: '32px',
  },
};
