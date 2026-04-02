import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Buttons/Button',
  tags: ['button', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    type: 'primary',
    disabled: false,
    label: 'Button',
    align: 'center',
    fillWidth: false,
    loading: false,
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    label: 'Secondary Button',
  },
};

export const Empty: Story = {
  args: {
    type: 'empty',
    label: 'Empty Button',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    label: 'Danger Button',
  },
};

export const PrimaryLoading: Story = {
  args: {
    type: 'primary',
    label: 'Loading...',
    loading: true,
  },
};

export const SecondaryLoading: Story = {
  args: {
    type: 'secondary',
    label: 'Loading...',
    loading: true,
  },
};

export const EmptyLoading: Story = {
  args: {
    type: 'empty',
    label: 'Loading...',
    loading: true,
  },
};

export const DangerLoading: Story = {
  args: {
    type: 'danger',
    label: 'Loading...',
    loading: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    type: 'primary',
    label: 'Disabled',
    disabled: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    type: 'secondary',
    label: 'Disabled',
    disabled: true,
  },
};

export const EmptyDisabled: Story = {
  args: {
    type: 'empty',
    label: 'Disabled',
    disabled: true,
  },
};

export const DangerDisabled: Story = {
  args: {
    type: 'danger',
    label: 'Disabled',
    disabled: true,
  },
};

export const WithIconLeft: Story = {
  args: {
    type: 'primary',
    label: 'With Left Icon',
    iconLeft: 'chevron-left',
  },
};

export const WithIconRight: Story = {
  args: {
    type: 'primary',
    label: 'With Right Icon',
    iconRight: 'chevron-right',
  },
};

export const WithIconsBoth: Story = {
  args: {
    type: 'primary',
    label: 'Both Icons',
    iconLeft: 'chevron-left',
    iconRight: 'chevron-right',
  },
};

export const FillWidth: Story = {
  args: {
    type: 'primary',
    label: 'Full Width Button',
    fillWidth: true,
  },
};

export const AlignLeft: Story = {
  args: {
    type: 'primary',
    label: 'Left Aligned',
    align: 'left',
  },
};

export const Interactive: Story = {
  args: {
    type: 'primary',
    label: 'Click Me',
  },
};
