import { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '@/components/IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Buttons/IconButton',
  tags: ['icon-button', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: {
    icon: 'user',
    type: 'primary',
    size: 'default',
    disabled: false,
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
    icon: 'user',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    icon: 'user',
  },
};

export const Ghost: Story = {
  args: {
    type: 'ghost',
    icon: 'user',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    icon: 'user',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    icon: 'user',
  },
};

export const DefaultSize: Story = {
  args: {
    type: 'primary',
    size: 'default',
    icon: 'user',
  },
};

export const Small: Story = {
  args: {
    type: 'primary',
    size: 'sm',
    icon: 'user',
  },
};

export const ExtraSmall: Story = {
  args: {
    type: 'primary',
    size: 'xs',
    icon: 'user',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    type: 'primary',
    icon: 'user',
    disabled: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    type: 'secondary',
    icon: 'user',
    disabled: true,
  },
};

export const GhostDisabled: Story = {
  args: {
    type: 'ghost',
    icon: 'user',
    disabled: true,
  },
};

export const DangerDisabled: Story = {
  args: {
    type: 'danger',
    icon: 'user',
    disabled: true,
  },
};

export const InfoDisabled: Story = {
  args: {
    type: 'info',
    icon: 'user',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    type: 'primary',
    icon: 'user',
    onClick: () => console.log('clicked'),
  },
};
