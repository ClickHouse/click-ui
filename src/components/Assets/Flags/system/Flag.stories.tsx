import { Meta, StoryObj } from '@storybook/react-vite';
import { Flag } from './Flag';
import FlagsLight from './FlagsLight';

const meta: Meta<typeof Flag> = {
  component: Flag,
  title: 'Assets/Flag',
  tags: ['FLAG', 'autodocs'],
  argTypes: {
    name: {
      options: Object.keys(FlagsLight),
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Flag>;

export const Playground: Story = {
  args: {
    name: 'united-states',
    width: '32px',
    height: '32px',
  },
};
