import { Meta, StoryObj } from '@storybook/react-vite';
import { Spacer } from '@/components/Spacer';
import type { SizeType } from '@/components/Spacer';

const meta: Meta<typeof Spacer> = {
  component: Spacer,
  title: 'Display/Spacer',
  tags: ['spacer', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spacer>;

const SpacerHarness = ({ size }: { size?: SizeType }) => (
  <div
    data-testid="spacer-harness"
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '160px',
      background: '#888',
    }}
  >
    <div style={{ height: '24px', background: '#222' }} />
    <Spacer size={size} />
    <div style={{ height: '24px', background: '#222' }} />
  </div>
);

export const Playground: Story = {
  args: {
    size: 'xxl',
  },
};

export const SizeXs: Story = {
  render: () => <SpacerHarness size="xs" />,
};

export const SizeSm: Story = {
  render: () => <SpacerHarness size="sm" />,
};

export const SizeMd: Story = {
  render: () => <SpacerHarness size="md" />,
};

export const SizeLg: Story = {
  render: () => <SpacerHarness size="lg" />,
};

export const SizeXl: Story = {
  render: () => <SpacerHarness size="xl" />,
};

export const SizeXxl: Story = {
  render: () => <SpacerHarness size="xxl" />,
};

export const DefaultSize: Story = {
  render: () => <SpacerHarness />,
};
