import { Meta, StoryObj } from '@storybook/react-vite';
import { CardPrimary } from '@/components/CardPrimary';

const meta: Meta<typeof CardPrimary> = {
  component: CardPrimary,
  title: 'Cards/Primary Card',
  tags: ['cardPrimary', 'autodocs'],
  decorators: Story => (
    <div style={{ display: 'grid', width: '60%', maxWidth: '480px' }}>
      <Story />
    </div>
  ),
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
    isSelected: false,
    size: 'md',
    alignContent: 'center',
    topBadgeText: 'Top badge',
  },
};

export const SizeMedium: Story = {
  args: {
    icon: 'building',
    title: 'Medium Card',
    description: 'This is a medium sized card.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
  },
};

export const SizeSmall: Story = {
  args: {
    icon: 'building',
    title: 'Small Card',
    description: 'This is a small sized card.',
    infoText: 'Learn More',
    size: 'sm',
    alignContent: 'center',
  },
};

export const AlignStart: Story = {
  args: {
    icon: 'building',
    title: 'Start Aligned Card',
    description: 'Content is aligned to the start.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'start',
  },
};

export const AlignCenter: Story = {
  args: {
    icon: 'building',
    title: 'Center Aligned Card',
    description: 'Content is aligned to the center.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
  },
};

export const AlignEnd: Story = {
  args: {
    icon: 'building',
    title: 'End Aligned Card',
    description: 'Content is aligned to the end.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'end',
  },
};

export const WithShadow: Story = {
  args: {
    icon: 'building',
    title: 'Card with Shadow',
    description: 'This card has a shadow effect.',
    infoText: 'Learn More',
    hasShadow: true,
    size: 'md',
    alignContent: 'center',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'building',
    title: 'Disabled Card',
    description: 'This card is disabled.',
    infoText: 'Learn More',
    disabled: true,
    size: 'md',
    alignContent: 'center',
  },
};

export const Selected: Story = {
  args: {
    icon: 'building',
    title: 'Selected Card',
    description: 'This card is selected.',
    infoText: 'Learn More',
    isSelected: true,
    size: 'md',
    alignContent: 'center',
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'building',
    title: 'Card with Icon',
    description: 'This card uses a library icon.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
  },
};

export const WithIconUrl: Story = {
  args: {
    iconUrl: 'https://clickhouse.com/favicon.ico',
    title: 'Card with Custom Icon',
    description: 'This card uses a custom icon URL.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Card without Icon',
    description: 'This card has no icon, just title and description.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
  },
};

export const TitleOnly: Story = {
  args: {
    icon: 'building',
    title: 'Title Only Card',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
  },
};

export const DescriptionOnly: Story = {
  args: {
    description: 'This card has only a description, no title or icon.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
  },
};

export const WithoutButton: Story = {
  args: {
    icon: 'building',
    title: 'Card without Button',
    description: 'This card has no action button.',
    size: 'md',
    alignContent: 'center',
  },
};

export const WithTopBadge: Story = {
  args: {
    icon: 'building',
    title: 'Card with Top Badge',
    description: 'This card has a badge at the top.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
    topBadgeText: 'Featured',
  },
};

export const WithTopBadgeSelected: Story = {
  args: {
    icon: 'building',
    title: 'Selected Card with Top Badge',
    description: 'This selected card has a badge at the top.',
    infoText: 'Learn More',
    size: 'md',
    alignContent: 'center',
    isSelected: true,
    topBadgeText: 'Selected',
  },
};

export const SmallWithBadge: Story = {
  args: {
    icon: 'building',
    title: 'Small Card with Badge',
    description: 'This is a small card with a top badge.',
    infoText: 'Learn More',
    size: 'sm',
    alignContent: 'center',
    topBadgeText: 'Small',
  },
};

export const SmallDisabled: Story = {
  args: {
    icon: 'building',
    title: 'Small Disabled Card',
    description: 'This is a small disabled card.',
    infoText: 'Learn More',
    size: 'sm',
    alignContent: 'center',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    icon: 'building',
    title: 'Interactive Card',
    description: 'Click this card to trigger an action.',
    infoText: 'Click Me',
    size: 'md',
    alignContent: 'center',
    onButtonClick: () => alert('Card button clicked!'),
  },
};
