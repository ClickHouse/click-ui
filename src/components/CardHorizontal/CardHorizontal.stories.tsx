import { Meta, StoryObj } from '@storybook/react-vite';
import { styled } from 'styled-components';

import { ICON_NAMES } from '../Icon/IconCommon';

import { CardHorizontal } from '@/components/CardHorizontal';

const GridCenter = styled.div`
  display: grid;
  width: 60%;
  max-width: 480px;
`;

const meta: Meta<typeof CardHorizontal> = {
  component: CardHorizontal,
  title: 'Cards/Horizontal Card',
  tags: ['cardHorizontal', 'autodocs'],
  argTypes: {
    icon: { type: { name: 'enum', value: [...ICON_NAMES] } },
    badgeIcon: { type: { name: 'enum', value: [...ICON_NAMES] } },
    badgeState: {
      type: {
        name: 'enum',
        value: ['default', 'success', 'neutral', 'danger', 'disabled', 'warning', 'info'],
      },
    },
    badgeIconDir: { type: { name: 'enum', value: ['start', 'end'] } },
    color: { type: { name: 'enum', value: ['default', 'muted'] } },
    size: { type: { name: 'enum', value: ['sm', 'md'] } },
  },
  decorators: Story => (
    <GridCenter>
      <Story />
    </GridCenter>
  ),
};

export default meta;

type Story = StoryObj<typeof CardHorizontal>;

export const Playground: Story = {
  args: {
    icon: 'building',
    title: 'Card title',
    description: 'A description very interesting that presumably relates to the card.',
    disabled: false,
    isSelected: false,
    badgeText: '',
    badgeIcon: undefined,
    badgeState: 'default',
    badgeIconDir: undefined,
    infoText: '',
    infoUrl: '',
    size: 'md',
    color: 'default',
  },
};

// Color variants
export const DefaultColor: Story = {
  args: {
    icon: 'building',
    title: 'Default Color Card',
    description: 'This is the default color variant.',
    color: 'default',
  },
};

export const MutedColor: Story = {
  args: {
    icon: 'building',
    title: 'Muted Color Card',
    description: 'This is the muted color variant.',
    color: 'muted',
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    icon: 'building',
    title: 'Small Card',
    description: 'This is the small size variant.',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    icon: 'building',
    title: 'Medium Card',
    description: 'This is the medium size variant.',
    size: 'md',
  },
};

// Disabled states
export const DefaultDisabled: Story = {
  args: {
    icon: 'building',
    title: 'Disabled Default Card',
    description: 'This card is disabled.',
    disabled: true,
    color: 'default',
  },
};

export const MutedDisabled: Story = {
  args: {
    icon: 'building',
    title: 'Disabled Muted Card',
    description: 'This card is disabled.',
    disabled: true,
    color: 'muted',
  },
};

// Selected states
export const DefaultSelected: Story = {
  args: {
    icon: 'building',
    title: 'Selected Default Card',
    description: 'This card is selected.',
    isSelected: true,
    color: 'default',
  },
};

export const MutedSelected: Story = {
  args: {
    icon: 'building',
    title: 'Selected Muted Card',
    description: 'This card is selected.',
    isSelected: true,
    color: 'muted',
  },
};

// Disabled + Selected
export const DefaultDisabledSelected: Story = {
  args: {
    icon: 'building',
    title: 'Disabled & Selected Card',
    description: 'This card is both disabled and selected.',
    disabled: true,
    isSelected: true,
    color: 'default',
  },
};

// With badge
export const WithBadge: Story = {
  args: {
    icon: 'building',
    title: 'Card with Badge',
    description: 'This card has a badge.',
    badgeText: 'New',
    badgeState: 'success',
  },
};

export const WithBadgeAndIcon: Story = {
  args: {
    icon: 'building',
    title: 'Card with Badge and Icon',
    description: 'This card has a badge with an icon.',
    badgeText: 'Info',
    badgeState: 'info',
    badgeIcon: 'check',
    badgeIconDir: 'start',
  },
};

// With info button
export const WithInfoButton: Story = {
  args: {
    icon: 'building',
    title: 'Card with Info Button',
    description: 'This card has an info button.',
    infoText: 'Learn more',
  },
};

export const WithInfoButtonMuted: Story = {
  args: {
    icon: 'building',
    title: 'Muted Card with Info Button',
    description: 'This is a muted card with an info button.',
    infoText: 'Learn more',
    color: 'muted',
  },
};

export const WithInfoButtonDisabled: Story = {
  args: {
    icon: 'building',
    title: 'Disabled Card with Info Button',
    description: 'This is a disabled card with an info button.',
    infoText: 'Learn more',
    disabled: true,
  },
};

// Non-selectable cards
export const NonSelectable: Story = {
  args: {
    icon: 'building',
    title: 'Non-Selectable Card',
    description: 'This card is not selectable (has infoText).',
    infoText: 'Click me',
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    title: 'Card Without Icon',
    description: 'This card does not have an icon.',
  },
};

// Title only
export const TitleOnly: Story = {
  args: {
    icon: 'building',
    title: 'Title Only Card',
  },
};

// Description only
export const DescriptionOnly: Story = {
  args: {
    icon: 'building',
    description: 'This card only has a description, no title.',
  },
};

// With children
export const WithChildren: Story = {
  args: {
    icon: 'building',
    title: 'Card with Children',
    description: 'This card has children content.',
    children: 'Additional child content goes here.',
  },
};

// Interactive story for testing
export const Interactive: Story = {
  args: {
    icon: 'check',
    title: 'Interactive Card',
    description: 'Click this card to test interactions.',
  },
};

// Interactive story with handler for E2E testing
export const InteractiveWithHandler: Story = {
  args: {
    icon: 'check',
    title: 'Interactive Card with Handler',
    description: 'This card has an onButtonClick handler for E2E testing.',
    onButtonClick: () => console.log('Card clicked!'),
  },
};
