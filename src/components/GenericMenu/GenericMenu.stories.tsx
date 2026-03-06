import type { Meta, StoryObj } from '@storybook/react-vite';
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

const DemoPanel = styled(GenericMenuPanel)`
  padding: 1rem;
  min-width: 200px;
`;

const DemoPopoverPanel = styled(GenericPopoverMenuPanel)`
  min-width: 200px;
`;

export const MenuPanel: StoryObj = {
  render: () => (
    <DemoContainer>
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
    <DemoContainer>
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
    <DemoContainer>
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
    <DemoContainer>
      <DemoPanel $type="context-menu">
        <GenericMenuItem>Cut</GenericMenuItem>
        <GenericMenuItem>Copy</GenericMenuItem>
        <GenericMenuItem>Paste</GenericMenuItem>
        <GenericMenuItem $type="danger">Delete</GenericMenuItem>
      </DemoPanel>
    </DemoContainer>
  ),
};
