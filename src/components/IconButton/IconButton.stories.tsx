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

export const Disabled: Story = {
  args: {
    disabled: true,
    icon: 'user',
  },
};

export const Empty: Story = {
  args: {
    type: 'ghost',
    icon: 'user',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    icon: 'user',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    icon: 'user',
  },
};
