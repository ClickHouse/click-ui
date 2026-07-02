import { Meta, StoryObj } from '@storybook/react-vite';
import { CrossButton } from '@/components/CrossButton';
import { Icon } from '@/components/Icon';

const meta: Meta<typeof CrossButton> = {
  component: CrossButton,
  title: 'Buttons/CrossButton',
  tags: ['cross-button', 'autodocs'],
  args: {
    children: (
      <Icon
        name="cross"
        size="lg"
      />
    ),
  },
};

export default meta;

type Story = StoryObj<typeof CrossButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
