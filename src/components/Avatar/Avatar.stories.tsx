import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { Avatar } from '@/components/Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Display/Avatar',
  tags: ['avatar', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const AvatarHarness = (props: ComponentProps<typeof Avatar>) => (
  <div
    data-testid="avatar-harness"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
    }}
  >
    <Avatar {...props} />
  </div>
);

export const Playground: Story = {
  args: {
    text: 'CM',
  },
};

export const TextFallbackSm: Story = {
  render: () => (
    <AvatarHarness
      text="Claude Mendoza"
      textSize="sm"
    />
  ),
};

export const TextFallbackMd: Story = {
  render: () => (
    <AvatarHarness
      text="Claude Mendoza"
      textSize="md"
    />
  ),
};

export const TextSingleWord: Story = {
  render: () => (
    <AvatarHarness
      text="Avatar"
      textSize="sm"
    />
  ),
};

export const TextSingleChar: Story = {
  render: () => (
    <AvatarHarness
      text="A"
      textSize="md"
    />
  ),
};

export const DefaultTextSize: Story = {
  render: () => <AvatarHarness text="Default Size" />,
};
