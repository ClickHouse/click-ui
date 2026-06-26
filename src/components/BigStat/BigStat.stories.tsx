import { Meta, StoryObj } from '@storybook/react-vite';
import { BigStat } from '@/components/BigStat';

const meta: Meta<typeof BigStat> = {
  component: BigStat,
  title: 'Display/Big Stat',
  tags: ['big-stat', 'autodocs'],
  decorators: [
    Story => (
      <div
        data-testid="big-stat-harness"
        style={{ display: 'inline-block', padding: '8px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BigStat>;

export const Playground: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    state: 'default',
    size: 'lg',
    spacing: 'sm',
    order: 'titleTop',
    height: '',
    fillWidth: false,
    maxWidth: '300px',
    error: false,
  },
};

// States

export const StateDefault: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    state: 'default',
  },
};

export const StateMuted: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    state: 'muted',
  },
};

export const StateError: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    error: true,
  },
};

// Sizes

export const SizeLg: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    size: 'lg',
  },
};

export const SizeSm: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    size: 'sm',
  },
};

// Spacing

export const SpacingSm: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    spacing: 'sm',
  },
};

export const SpacingLg: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    spacing: 'lg',
  },
};

// Order

export const OrderTitleTop: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    order: 'titleTop',
  },
};

export const OrderTitleBottom: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    order: 'titleBottom',
  },
};

// Layout

export const FillWidth: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    fillWidth: true,
  },
  decorators: [
    Story => (
      <div
        data-testid="big-stat-harness"
        style={{ display: 'block', width: '320px', padding: '8px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export const MaxWidth: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    fillWidth: true,
    maxWidth: '200px',
  },
  decorators: [
    Story => (
      <div
        data-testid="big-stat-harness"
        style={{ display: 'block', width: '320px', padding: '8px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export const CustomHeight: Story = {
  args: {
    label: 'Percentage complete',
    title: '100%',
    height: '10rem',
  },
};
