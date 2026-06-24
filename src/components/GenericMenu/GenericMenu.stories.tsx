import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import {
  GenericMenuPanel,
  GenericPopoverMenuPanel,
  Arrow,
  GenericMenuItem,
} from './GenericMenu';
import { styled } from 'styled-components';

const meta: Meta = {
  title: 'Components/GenericMenu',
  component: GenericMenuPanel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;

const DemoPanel = (props: ComponentProps<typeof GenericMenuPanel<'div'>>) => (
  <GenericMenuPanel
    {...props}
    style={{ padding: '1rem', minWidth: '200px', ...props.style }}
  />
);

const DemoPopoverPanel = (
  props: ComponentProps<typeof GenericPopoverMenuPanel<'div'>>
) => (
  <GenericPopoverMenuPanel
    {...props}
    style={{ minWidth: '200px', ...props.style }}
  />
);

export const MenuPanel: StoryObj = {
  render: () => (
    <DemoContainer data-testid="generic-menu-harness">
      <DemoPanel $type="dropdown-menu">
        <GenericMenuItem>Default Item</GenericMenuItem>
        <GenericMenuItem $type="danger">Danger Item</GenericMenuItem>
        <GenericMenuItem data-disabled>Disabled Item</GenericMenuItem>
      </DemoPanel>
    </DemoContainer>
  ),
};

export const PopoverPanel: StoryObj = {
  render: () => (
    <DemoContainer data-testid="generic-menu-harness">
      <DemoPopoverPanel $type="popover">
        <div style={{ padding: '1rem' }}>
          <h4>Popover Content</h4>
          <p>This is a generic popover panel</p>
        </div>
      </DemoPopoverPanel>
    </DemoContainer>
  ),
};

export const WithArrow: StoryObj = {
  render: () => (
    <DemoContainer data-testid="generic-menu-harness">
      <DemoPanel
        $type="popover"
        $showArrow
      >
        <div style={{ padding: '1rem' }}>
          <p>Panel with arrow indicator</p>
        </div>
      </DemoPanel>
      <Arrow
        width="16"
        height="8"
        viewBox="0 0 16 8"
      >
        <path d="M0 8L8 0L16 8H0Z" />
      </Arrow>
    </DemoContainer>
  ),
};

export const MenuItems: StoryObj = {
  render: () => (
    <DemoContainer data-testid="generic-menu-harness">
      <DemoPanel $type="context-menu">
        <GenericMenuItem>Cut</GenericMenuItem>
        <GenericMenuItem>Copy</GenericMenuItem>
        <GenericMenuItem>Paste</GenericMenuItem>
        <GenericMenuItem $type="danger">Delete</GenericMenuItem>
      </DemoPanel>
    </DemoContainer>
  ),
};

export const ItemStates: StoryObj = {
  render: () => (
    <DemoContainer data-testid="generic-menu-harness">
      <DemoPanel $type="dropdown-menu">
        <GenericMenuItem>Default</GenericMenuItem>
        <GenericMenuItem data-highlighted>Highlighted</GenericMenuItem>
        <GenericMenuItem data-state="checked">Checked</GenericMenuItem>
        <GenericMenuItem data-selected="true">Selected</GenericMenuItem>
        <GenericMenuItem data-disabled>Disabled</GenericMenuItem>
        <GenericMenuItem $type="danger">Danger default</GenericMenuItem>
        <GenericMenuItem
          $type="danger"
          data-highlighted
        >
          Danger highlighted
        </GenericMenuItem>
        <GenericMenuItem
          $type="danger"
          data-disabled
        >
          Danger disabled
        </GenericMenuItem>
      </DemoPanel>
    </DemoContainer>
  ),
};
