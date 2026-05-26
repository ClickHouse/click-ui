import { Meta, StoryObj } from '@storybook/react-vite';
import { CardPrimary } from '@/components/CardPrimary';

const meta: Meta<typeof CardPrimary> = {
  component: CardPrimary,
  title: 'Cards/Primary Card',
  tags: ['cardPrimary', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof CardPrimary>;

const baseArgs = {
  icon: 'building' as const,
  title: 'Card title',
  description: 'A description very interesting that presumably relates to the card.',
  infoUrl: 'https://clickhouse.com',
  infoText: 'Read More',
  size: 'md' as const,
  alignContent: 'center' as const,
};

export const Playground: Story = {
  args: {
    ...baseArgs,
    hasShadow: false,
    disabled: false,
    isSelected: true,
    topBadgeText: 'Top badge',
  },
};

export const Default: Story = {
  args: baseArgs,
};

export const Small: Story = {
  args: {
    ...baseArgs,
    size: 'sm',
  },
};

export const AlignStart: Story = {
  args: {
    ...baseArgs,
    alignContent: 'start',
  },
};

export const AlignEnd: Story = {
  args: {
    ...baseArgs,
    alignContent: 'end',
  },
};

export const WithShadow: Story = {
  args: {
    ...baseArgs,
    hasShadow: true,
  },
};

export const Selected: Story = {
  args: {
    ...baseArgs,
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
};

export const WithTopBadge: Story = {
  args: {
    ...baseArgs,
    topBadgeText: 'Top badge',
  },
};

export const WithTopBadgeSelected: Story = {
  args: {
    ...baseArgs,
    topBadgeText: 'Top badge',
    isSelected: true,
  },
};

export const WithoutButton: Story = {
  args: {
    icon: 'building',
    title: 'Card title',
    description: 'A description very interesting that presumably relates to the card.',
    size: 'md',
    alignContent: 'center',
  },
};
