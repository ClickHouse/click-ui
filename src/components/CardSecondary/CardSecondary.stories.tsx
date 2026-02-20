import { Meta, StoryObj } from '@storybook/react-vite';
import { CardSecondary } from '@/components/CardSecondary';

const meta: Meta<typeof CardSecondary> = {
  component: CardSecondary,
  title: 'Cards/Secondary Card',
  tags: ['cardSecondary', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof CardSecondary>;

export const Playground: Story = {
  args: {
    title: 'Card title',
    icon: 'building',
    description: 'A description very interesting that presumably relates to the card',
    infoUrl: 'https://clickhouse.com',
    infoText: 'Read More',
    hasShadow: false,
    disabled: false,
    badgeText: 'experiment',
    badgeState: 'success',
  },
};
