import { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties, ReactNode } from 'react';

import { ICON_NAMES } from '../Icon/IconCommon';

import { CardHorizontal } from '@/components/CardHorizontal';

const gridCenterStyle: CSSProperties = { display: 'grid', width: '60%' };
const GridCenter = ({ children }: { children: ReactNode }) => (
  <div style={gridCenterStyle}>{children}</div>
);

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
        // FIXME should refer to the Badge constants
        value: ['default', 'success', 'neutral', 'danger', 'disabled', 'warning', 'info'],
      },
    },
    // FIXME should refer to a constant
    badgeIconDir: { type: { name: 'enum', value: ['start', 'end'] } },
  },
  decorators: Story => (
    <GridCenter>
      <Story />
    </GridCenter>
  ),
};

export default meta;

type Story = StoryObj<typeof CardHorizontal>;

const baseArgs = {
  icon: 'building' as const,
  title: 'Card title',
  description: 'A description very interesting that presumably relates to the card.',
  size: 'md' as const,
};

export const Playground: Story = {
  args: {
    ...baseArgs,
    disabled: false,
    isSelected: false,
    badgeText: '',
    badgeIcon: undefined,
    badgeState: 'default',
    badgeIconDir: undefined,
    infoText: '',
    infoUrl: '',
  },
};

export const Default: Story = {
  args: baseArgs,
};

export const Muted: Story = {
  args: {
    ...baseArgs,
    color: 'muted',
  },
};

export const Small: Story = {
  args: {
    ...baseArgs,
    size: 'sm',
  },
};

export const AlignmentTop: Story = {
  args: {
    ...baseArgs,
    alignment: 'top',
  },
};

export const Selectable: Story = {
  args: {
    ...baseArgs,
    isSelectable: true,
  },
};

export const Selected: Story = {
  args: {
    ...baseArgs,
    isSelectable: true,
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    isSelected: true,
  },
};

export const WithBadge: Story = {
  args: {
    ...baseArgs,
    badgeText: 'New',
    badgeState: 'success',
  },
};

export const WithButton: Story = {
  args: {
    ...baseArgs,
    infoText: 'Read more',
    infoUrl: 'https://clickhouse.com',
  },
};
