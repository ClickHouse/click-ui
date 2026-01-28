import { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'Display/ProgressBar',
  tags: ['progressBar', 'autodocs'],
  argTypes: {
    dismissable: {
      if: { arg: 'type', eq: 'default' },
    },
    onCancel: {
      if: { arg: 'dismissable', truthy: true },
    },
    successMessage: {
      if: { arg: 'type', eq: 'default' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  args: {
    progress: 60,
    type: 'default',
    orientation: 'horizontal',
    dir: 'start',
    dismissable: true,
    onCancel: () => console.log('onCancel clicked'),
    successMessage: 'Progress completed',
  },
};

export const SmallProgressBar: Story = {
  args: {
    progress: 60,
    type: 'small',
    orientation: 'horizontal',
    dir: 'start',
  },
};

export const VerticalProgressBar: Story = {
  args: {
    progress: 75,
    type: 'small',
    orientation: 'vertical',
    dir: 'start',
    style: { height: '10rem' },
  },
};
