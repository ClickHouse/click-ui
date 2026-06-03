import { Meta, StoryObj } from '@storybook/react-vite';
import { Text, TextProps } from './Text';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Typography/Text',
  tags: ['text', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Text>;

const sample = 'Query billions of rows in milliseconds';

const TextHarness = (props: TextProps) => (
  <div
    data-testid="text-harness"
    style={{ display: 'inline-block', padding: '8px', width: '320px' }}
  >
    <Text {...props} />
  </div>
);

export const Playground: Story = {
  args: {
    size: 'md',
    weight: 'normal',
    color: 'default',
    align: 'left',
    children: sample,
  },
};

// Sizes

export const SizeXs: Story = {
  render: () => (
    <TextHarness size="xs">{sample}</TextHarness>
  ),
};

export const SizeSm: Story = {
  render: () => (
    <TextHarness size="sm">{sample}</TextHarness>
  ),
};

export const SizeMd: Story = {
  render: () => (
    <TextHarness size="md">{sample}</TextHarness>
  ),
};

export const SizeLg: Story = {
  render: () => (
    <TextHarness size="lg">{sample}</TextHarness>
  ),
};

// Weights

export const WeightNormal: Story = {
  render: () => (
    <TextHarness weight="normal">{sample}</TextHarness>
  ),
};

export const WeightMedium: Story = {
  render: () => (
    <TextHarness weight="medium">{sample}</TextHarness>
  ),
};

export const WeightSemibold: Story = {
  render: () => (
    <TextHarness weight="semibold">{sample}</TextHarness>
  ),
};

export const WeightBold: Story = {
  render: () => (
    <TextHarness weight="bold">{sample}</TextHarness>
  ),
};

export const WeightMono: Story = {
  render: () => (
    <TextHarness weight="mono">{sample}</TextHarness>
  ),
};

// Colors

export const ColorDefault: Story = {
  render: () => (
    <TextHarness color="default">{sample}</TextHarness>
  ),
};

export const ColorMuted: Story = {
  render: () => (
    <TextHarness color="muted">{sample}</TextHarness>
  ),
};

export const ColorDanger: Story = {
  render: () => (
    <TextHarness color="danger">{sample}</TextHarness>
  ),
};

export const ColorDisabled: Story = {
  render: () => (
    <TextHarness color="disabled">{sample}</TextHarness>
  ),
};

// Alignment

export const AlignLeft: Story = {
  render: () => (
    <TextHarness align="left">{sample}</TextHarness>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <TextHarness align="center">{sample}</TextHarness>
  ),
};

export const AlignRight: Story = {
  render: () => (
    <TextHarness align="right">{sample}</TextHarness>
  ),
};

// Fill width

export const FillWidth: Story = {
  render: () => (
    <TextHarness
      fillWidth
      align="center"
    >
      {sample}
    </TextHarness>
  ),
};
