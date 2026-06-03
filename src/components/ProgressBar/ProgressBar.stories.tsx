import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from '@/components/ProgressBar';

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

// Vertical bars fill their container's height. Set the height on a
// width-hugging wrapper rather than passing `style` to the component, since the
// component spreads `style` and would otherwise clobber its own `--progress`
// fill variable, leaving the bar empty.
const verticalDecorator: Decorator = Story => (
  <div style={{ display: 'inline-flex', height: '10rem' }}>
    <Story />
  </div>
);

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
  },
  decorators: [verticalDecorator],
};

export const DefaultHorizontal: Story = {
  args: {
    progress: 60,
    type: 'default',
    orientation: 'horizontal',
    dir: 'start',
  },
};

export const DefaultDismissable: Story = {
  args: {
    progress: 60,
    type: 'default',
    orientation: 'horizontal',
    dir: 'start',
    dismissable: true,
    onCancel: () => console.log('onCancel clicked'),
  },
};

export const DefaultDirEnd: Story = {
  args: {
    progress: 60,
    type: 'default',
    orientation: 'horizontal',
    dir: 'end',
  },
};

export const DefaultCompleted: Story = {
  args: {
    progress: 100,
    type: 'default',
    orientation: 'horizontal',
    dir: 'start',
  },
};

export const DefaultCompletedWithSuccessMessage: Story = {
  args: {
    progress: 100,
    type: 'default',
    orientation: 'horizontal',
    dir: 'start',
    successMessage: 'Progress completed',
  },
};

export const SmallHorizontal: Story = {
  args: {
    progress: 60,
    type: 'small',
    orientation: 'horizontal',
    dir: 'start',
  },
};

export const SmallDirEnd: Story = {
  args: {
    progress: 60,
    type: 'small',
    orientation: 'horizontal',
    dir: 'end',
  },
};

export const SmallCompleted: Story = {
  args: {
    progress: 100,
    type: 'small',
    orientation: 'horizontal',
    dir: 'start',
  },
};

export const VerticalDirStart: Story = {
  args: {
    progress: 75,
    type: 'small',
    orientation: 'vertical',
    dir: 'start',
  },
  decorators: [verticalDecorator],
};

export const VerticalDirEnd: Story = {
  args: {
    progress: 75,
    type: 'small',
    orientation: 'vertical',
    dir: 'end',
  },
  decorators: [verticalDecorator],
};
