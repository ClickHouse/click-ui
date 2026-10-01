import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@/components/Checkbox';
import { Spacer } from '@/components/Spacer';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import { HoverCard } from '@/components/HoverCard';

interface HoverCardExampleProps {
  open: 'default' | 'open' | 'closed';
  showArrow: boolean;
  forceMount?: boolean;
  title?: string;
  openDelay?: number;
  closeDelay?: number;
}

const HoverCardExample = ({
  open,
  showArrow,
  forceMount,
  title,
  openDelay,
  closeDelay,
}: HoverCardExampleProps) => (
  <HoverCard
    open={open === 'default' ? undefined : open === 'open'}
    openDelay={openDelay}
    closeDelay={closeDelay}
  >
    <HoverCard.Trigger>Hover Here</HoverCard.Trigger>
    <HoverCard.Content
      showArrow={showArrow}
      forceMount={forceMount ? true : undefined}
      title={title}
    >
      <Title
        color="default"
        size="sm"
        type="h5"
      >
        Hover Title
      </Title>
      <Spacer />
      <Text>Click on the input element below.</Text>
      <Spacer />
      <Checkbox label="This is a sample data to experiment the popover" />
    </HoverCard.Content>
  </HoverCard>
);

const meta: Meta<typeof HoverCardExample> = {
  component: HoverCardExample,
  subcomponents: {
    'HoverCard.Trigger': HoverCard.Trigger as React.ComponentType<unknown>,
    'HoverCard.Content': HoverCard.Content as React.ComponentType<unknown>,
  },
  title: 'Display/HoverCard',
  tags: ['form-field', 'hover-card', 'autodocs'],
  argTypes: {
    open: { control: 'radio', options: ['default', 'open', 'closed'] },
    showArrow: { control: 'boolean' },
    forceMount: { control: 'boolean' },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof HoverCardExample>;

export const Playground: Story = {
  args: {
    open: 'default',
  },
};

/**
 * Closed hover card — exercises only the trigger (`width: fit-content`), which
 * is the single piece of styling HoverCard owns. The content panel is portaled
 * and not mounted while closed.
 */
export const TriggerClosed: Story = {
  args: {
    open: 'closed',
    showArrow: false,
  },
};

/** Open hover card without the arrow. */
export const OpenNoArrow: Story = {
  args: {
    open: 'open',
    showArrow: false,
    openDelay: 0,
    closeDelay: 0,
  },
};

/** Open hover card with the arrow shown (exercises the `showArrow` margin path). */
export const OpenWithArrow: Story = {
  args: {
    open: 'open',
    showArrow: true,
    openDelay: 0,
    closeDelay: 0,
  },
};
