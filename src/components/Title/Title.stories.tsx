import { Meta, StoryObj } from '@storybook/react-vite';
import { Title, TitleProps } from './Title';

const meta: Meta<typeof Title> = {
  component: Title,
  title: 'Typography/Title',
  tags: ['title', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Title>;

const sample = 'Query billions of rows in milliseconds';

const TitleHarness = (props: TitleProps) => (
  <div
    data-testid="title-harness"
    style={{ display: 'inline-block', padding: '8px', width: '420px' }}
  >
    <Title {...props} />
  </div>
);

export const Playground: Story = {
  args: {
    size: 'md',
    type: 'h1',
    family: 'product',
    color: 'default',
    align: 'left',
    children: sample,
  },
};

// Sizes

export const SizeXs: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      size="xs"
    >
      {sample}
    </TitleHarness>
  ),
};

export const SizeSm: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      size="sm"
    >
      {sample}
    </TitleHarness>
  ),
};

export const SizeMd: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      size="md"
    >
      {sample}
    </TitleHarness>
  ),
};

export const SizeLg: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      size="lg"
    >
      {sample}
    </TitleHarness>
  ),
};

export const SizeXl: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      size="xl"
    >
      {sample}
    </TitleHarness>
  ),
};

// Families

export const FamilyProduct: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      family="product"
      size="lg"
    >
      {sample}
    </TitleHarness>
  ),
};

export const FamilyBrand: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      family="brand"
      size="lg"
    >
      {sample}
    </TitleHarness>
  ),
};

// Colors

export const ColorDefault: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      color="default"
      size="lg"
    >
      {sample}
    </TitleHarness>
  ),
};

export const ColorMuted: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      color="muted"
      size="lg"
    >
      {sample}
    </TitleHarness>
  ),
};

// Alignment

export const AlignLeft: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      align="left"
      size="md"
    >
      {sample}
    </TitleHarness>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      align="center"
      size="md"
    >
      {sample}
    </TitleHarness>
  ),
};

export const AlignRight: Story = {
  render: () => (
    <TitleHarness
      type="h1"
      align="right"
      size="md"
    >
      {sample}
    </TitleHarness>
  ),
};

// Heading levels

export const HeadingLevels: Story = {
  render: () => (
    <div
      data-testid="title-harness"
      style={{ display: 'inline-block', padding: '8px', width: '420px' }}
    >
      <Title type="h1">Heading level 1</Title>
      <Title type="h2">Heading level 2</Title>
      <Title type="h3">Heading level 3</Title>
      <Title type="h4">Heading level 4</Title>
      <Title type="h5">Heading level 5</Title>
      <Title type="h6">Heading level 6</Title>
    </div>
  ),
};

// Link content (captures anchor styling)

export const WithLink: Story = {
  render: () => (
    <TitleHarness
      type="h2"
      size="lg"
    >
      Read the <a href="#docs">documentation</a> now
    </TitleHarness>
  ),
};

// Title inside an italic parent — `font-style: inherit` must survive the `font`
// shorthand so the heading renders italic (regression lock for the CSS Modules
// migration, where the compound `font` classes otherwise reset font-style).
export const InheritItalic: Story = {
  render: () => (
    <div
      data-testid="title-harness"
      style={{
        display: 'inline-block',
        padding: '8px',
        width: '420px',
        fontStyle: 'italic',
      }}
    >
      <Title type="h2">{sample}</Title>
    </div>
  ),
};
