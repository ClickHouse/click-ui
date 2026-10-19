import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CardSecondary } from '@/components/CardSecondary';

const meta: Meta<typeof CardSecondary> = {
  component: CardSecondary,
  title: 'Cards/Secondary Card',
  tags: ['cardSecondary', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof CardSecondary>;

const baseArgs = {
  title: 'Card title',
  icon: 'building' as const,
  description: 'A description very interesting that presumably relates to the card',
  infoUrl: 'https://clickhouse.com',
  infoText: 'Read More',
};

export const Playground: Story = {
  args: {
    ...baseArgs,
    hasShadow: false,
    disabled: false,
    badgeText: 'experiment',
    badgeState: 'success',
  },
};

export const Default: Story = {
  args: baseArgs,
};

export const WithBadge: Story = {
  args: {
    ...baseArgs,
    badgeText: 'experiment',
    badgeState: 'success',
  },
};

export const WithShadow: Story = {
  args: {
    ...baseArgs,
    hasShadow: true,
  },
};

export const WithCustomIcon: Story = {
  args: {
    ...baseArgs,
    iconUrl: 'https://avatars.githubusercontent.com/u/52454919?s=200&v=4',
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    badgeText: 'experiment',
    badgeState: 'success',
    disabled: true,
  },
};

export const Keyboard: Story = {
  args: {
    title: baseArgs.title,
    icon: baseArgs.icon,
    description: baseArgs.description,
    infoText: baseArgs.infoText,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const card = within(canvasElement).getByRole('button', { name: /Card title/ });

    await userEvent.tab();
    await expect(card).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
