import { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '@/components/Link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Typography/Link',
  tags: ['link', 'autodocs'],
  args: {
    href: 'https://www.example.com',
    children: 'Try me!',
  },
  decorators: [
    Story => (
      <div
        data-testid="link-harness"
        style={{
          display: 'inline-flex',
          padding: '8px',
          // Match the storybook backdrop so the link's themed color renders against
          // its intended background in the autodocs view (where Storybook's
          // .docs-story container otherwise paints a white card regardless of theme).
          background: 'var(--click-storybook-global-background)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  args: {
    size: 'md',
    weight: 'normal',
    href: 'https://www.google.com',
    children: 'Try me!',
  },
};

export const Default: Story = {};

export const SizeXs: Story = {
  args: { size: 'xs' },
};

export const SizeSm: Story = {
  args: { size: 'sm' },
};

export const SizeMd: Story = {
  args: { size: 'md' },
};

export const SizeLg: Story = {
  args: { size: 'lg' },
};

export const WeightNormal: Story = {
  args: { weight: 'normal' },
};

export const WeightMedium: Story = {
  args: { weight: 'medium' },
};

export const WeightSemibold: Story = {
  args: { weight: 'semibold' },
};

export const WeightBold: Story = {
  args: { weight: 'bold' },
};

export const WithIcon: Story = {
  args: { icon: 'popout' },
};

export const WithIconSm: Story = {
  args: { size: 'sm', icon: 'popout' },
};
