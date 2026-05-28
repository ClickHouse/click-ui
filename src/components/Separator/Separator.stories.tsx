import { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/components/Separator';
import type { SeparatorProps } from './Separator.types';

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'Display/Separator',
  tags: ['separator', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Separator>;

const HorizontalHarness = ({ size }: { size: SeparatorProps['size'] }) => (
  <div
    data-testid="separator-harness"
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '160px',
      background: '#888',
    }}
  >
    <div style={{ height: '24px', background: '#222' }} />
    <Separator
      size={size}
      orientation="horizontal"
    />
    <div style={{ height: '24px', background: '#222' }} />
  </div>
);

const DefaultHarness = ({ size }: { size: SeparatorProps['size'] }) => (
  <div
    data-testid="separator-harness"
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '160px',
      background: '#888',
    }}
  >
    <div style={{ height: '24px', background: '#222' }} />
    <Separator size={size} />
    <div style={{ height: '24px', background: '#222' }} />
  </div>
);

const VerticalHarness = ({ size }: { size: SeparatorProps['size'] }) => (
  <div
    data-testid="separator-harness"
    style={{
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      height: '80px',
      background: '#888',
    }}
  >
    <div style={{ width: '24px', background: '#222' }} />
    <Separator
      size={size}
      orientation="vertical"
    />
    <div style={{ width: '24px', background: '#222' }} />
  </div>
);

export const Playground: Story = {
  args: {
    size: 'xs',
    orientation: 'horizontal',
  },
};

export const HorizontalXs: Story = {
  render: () => <HorizontalHarness size="xs" />,
};

export const HorizontalSm: Story = {
  render: () => <HorizontalHarness size="sm" />,
};

export const HorizontalMd: Story = {
  render: () => <HorizontalHarness size="md" />,
};

export const HorizontalLg: Story = {
  render: () => <HorizontalHarness size="lg" />,
};

export const HorizontalXl: Story = {
  render: () => <HorizontalHarness size="xl" />,
};

export const HorizontalXxl: Story = {
  render: () => <HorizontalHarness size="xxl" />,
};

export const VerticalXs: Story = {
  render: () => <VerticalHarness size="xs" />,
};

export const VerticalSm: Story = {
  render: () => <VerticalHarness size="sm" />,
};

export const VerticalMd: Story = {
  render: () => <VerticalHarness size="md" />,
};

export const VerticalLg: Story = {
  render: () => <VerticalHarness size="lg" />,
};

export const VerticalXl: Story = {
  render: () => <VerticalHarness size="xl" />,
};

export const VerticalXxl: Story = {
  render: () => <VerticalHarness size="xxl" />,
};

export const DefaultOrientation: Story = {
  render: () => <DefaultHarness size="md" />,
};
