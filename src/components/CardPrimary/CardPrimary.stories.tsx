import { Meta, StoryObj } from '@storybook/react-vite';
import { CardPrimary } from '@/components/CardPrimary';

const meta: Meta<typeof CardPrimary> = {
  component: CardPrimary,
  title: 'Cards/Primary Card',
  tags: ['cardPrimary', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof CardPrimary>;

export const Playground: Story = {
  args: {
    icon: 'building',
    title: 'Card title',
    description: 'A description very interesting that presumably relates to the card.',
    infoUrl: 'https://clickhouse.com',
    infoText: 'Read More',
    hasShadow: false,
    disabled: false,
    isSelected: true,
    size: 'md',
    alignContent: 'center',
    topBadgeText: 'Top badge',
  },
};
