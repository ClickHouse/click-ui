import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '@/components/Tooltip';
import { Text } from '@/components/Text';

interface TooltipExampleProps {
  open: 'default' | 'open' | 'closed';
  disabled?: boolean;
  showArrow?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  maxWidth?: string;
  content?: string;
}

const TooltipExample = ({
  open,
  disabled,
  showArrow,
  side,
  maxWidth,
  content = 'Tooltip content',
}: TooltipExampleProps) => (
  <div
    style={{
      display: 'grid',
      placeItems: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <Tooltip
      open={open === 'default' ? undefined : open === 'open'}
      disabled={disabled}
    >
      <Tooltip.Trigger>
        <Text>Tooltip Trigger(Hover)</Text>
      </Tooltip.Trigger>

      <Tooltip.Content
        showArrow={showArrow}
        side={side}
        maxWidth={maxWidth}
      >
        {content}
      </Tooltip.Content>
    </Tooltip>
  </div>
);

const meta: Meta<typeof TooltipExample> = {
  component: TooltipExample,
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger as React.ComponentType<unknown>,
    'Tooltip.Content': Tooltip.Content as React.ComponentType<unknown>,
  },
  title: 'Display/Tooltip',
  tags: ['form-field', 'tooltip', 'autodocs'],
  argTypes: {
    open: { control: 'radio', options: ['default', 'open', 'closed'] },
    disabled: { control: 'boolean' },
    showArrow: { control: 'boolean' },
    side: { control: 'radio', options: ['top', 'right', 'bottom', 'left'] },
    maxWidth: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof TooltipExample>;

export const Playground: Story = {
  args: {
    open: 'default',
    disabled: false,
    showArrow: true,
    side: 'bottom',
  },
};

/** Open tooltip without the arrow. */
export const OpenNoArrow: Story = {
  args: {
    open: 'open',
    showArrow: false,
    side: 'bottom',
  },
};

/** Open tooltip with the arrow shown. */
export const OpenWithArrow: Story = {
  args: {
    open: 'open',
    showArrow: true,
    side: 'bottom',
  },
};

/** Open tooltip constrained by `maxWidth`, exercising the wrapping `white-space: pre-wrap` path. */
export const OpenMaxWidth: Story = {
  args: {
    open: 'open',
    showArrow: true,
    side: 'bottom',
    maxWidth: '150px',
    content: 'This is a longer tooltip content that should wrap across multiple lines.',
  },
};
