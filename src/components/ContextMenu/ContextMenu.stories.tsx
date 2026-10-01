import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenuProps } from '@radix-ui/react-context-menu';
import { ContextMenu, ContextMenuItemProps } from '@/components/ContextMenu';

interface ContextMenuExampleProps extends ContextMenuProps {
  disabled?: boolean;
  showArrow?: boolean;
}

const gridCenterStyle: React.CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  height: '100%',
};

const triggerStyle: React.CSSProperties = {
  ...gridCenterStyle,
  border: '2px currentColor dashed',
};

const ContextMenuExample = ({
  showArrow,
  disabled,
  ...props
}: ContextMenuExampleProps) => {
  return (
    <div style={gridCenterStyle}>
      <ContextMenu {...props}>
        <ContextMenu.Trigger disabled={disabled}>
          <div style={triggerStyle}>ContextMenu Trigger</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content showArrow={showArrow}>
          <ContextMenu.Group>
            <ContextMenu.Item>Content0</ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Item icon="activity">Content1 long text content</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Hover over</ContextMenu.SubTrigger>
            <ContextMenu.Content sub>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Sub>
          <ContextMenu.Item
            icon="activity"
            iconDir="end"
          >
            Content2
          </ContextMenu.Item>
          <ContextMenu.Item disabled>Content3</ContextMenu.Item>
          <ContextMenu.Item type="danger">Delete content</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  );
};

const meta: Meta<typeof ContextMenuExample> = {
  component: ContextMenuExample,
  subcomponents: {
    'ContextMenu.Trigger': ContextMenu.Trigger as React.ComponentType<unknown>,
    'ContextMenu.Content': ContextMenu.Content as React.ComponentType<unknown>,
    'ContextMenu.SubTrigger': ContextMenu.SubTrigger as React.ComponentType<unknown>,
    'ContextMenu.Group': ContextMenu.Group as React.ComponentType<unknown>,
    'ContextMenu.Sub': ContextMenu.Sub as React.ComponentType<unknown>,
    'ContextMenu.Item': ContextMenu.Item as React.ComponentType<ContextMenuItemProps>,
  },
  title: 'Display/ContextMenu',
  tags: ['form-field', 'dropdown', 'autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    showArrow: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenuExample>;

export const Playground: Story = {
  args: {
    showArrow: true,
  },
};

// Visual-regression story: a plain trigger the spec right-clicks to open the
// context menu, so the menu panel + item extension styles can be screenshotted.
const vrTriggerStyle: React.CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: '240px',
  height: '120px',
  border: '2px currentColor dashed',
};

export const OpenContent: Story = {
  render: () => (
    <div
      data-testid="context-menu-harness"
      style={{ padding: '2rem', paddingBottom: '6rem', minHeight: 420 }}
    >
      <ContextMenu>
        <ContextMenu.Trigger>
          <div style={vrTriggerStyle}>Right-click here</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          showArrow
          avoidCollisions={false}
        >
          <ContextMenu.Group>
            <ContextMenu.Item>Content0</ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Item icon="activity">Item with icon</ContextMenu.Item>
          <ContextMenu.Item
            icon="activity"
            iconDir="end"
          >
            Icon end
          </ContextMenu.Item>
          <ContextMenu.Item disabled>Disabled item</ContextMenu.Item>
          <ContextMenu.Item type="danger">Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  ),
};
