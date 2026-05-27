import { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '@/components/Link';
import type { IconName } from '@/components/Icon/Icon.types';
import type { TextSize, TextWeight } from '@/components/Text';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Typography/Link',
  tags: ['link', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Link>;

interface LinkHarnessProps {
  size?: TextSize;
  weight?: TextWeight;
  icon?: IconName;
  children?: React.ReactNode;
}

const LinkHarness = ({ size, weight, icon, children = 'Try me!' }: LinkHarnessProps) => (
  <div
    data-testid="link-harness"
    style={{
      display: 'inline-flex',
      padding: '8px',
      background: 'transparent',
    }}
  >
    <Link
      size={size}
      weight={weight}
      icon={icon}
      href="https://www.example.com"
    >
      {children}
    </Link>
  </div>
);

export const Playground: Story = {
  args: {
    size: 'md',
    weight: 'normal',
    href: 'https://www.google.com',
    children: 'Try me!',
  },
};

export const Default: Story = {
  render: () => <LinkHarness />,
};

export const SizeXs: Story = {
  render: () => <LinkHarness size="xs" />,
};

export const SizeSm: Story = {
  render: () => <LinkHarness size="sm" />,
};

export const SizeMd: Story = {
  render: () => <LinkHarness size="md" />,
};

export const SizeLg: Story = {
  render: () => <LinkHarness size="lg" />,
};

export const WeightNormal: Story = {
  render: () => <LinkHarness weight="normal" />,
};

export const WeightMedium: Story = {
  render: () => <LinkHarness weight="medium" />,
};

export const WeightSemibold: Story = {
  render: () => <LinkHarness weight="semibold" />,
};

export const WeightBold: Story = {
  render: () => <LinkHarness weight="bold" />,
};

export const WithIcon: Story = {
  render: () => <LinkHarness icon="popout" />,
};

export const WithIconSm: Story = {
  render: () => (
    <LinkHarness
      size="sm"
      icon="popout"
    />
  ),
};
