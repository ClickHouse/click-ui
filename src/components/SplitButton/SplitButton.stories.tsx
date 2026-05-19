import { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, SplitButton } from '@/components/SplitButton';

const menuItems: Menu[] = [
  {
    type: 'group',
    items: [
      {
        label: 'Content0',
      },
    ],
  },
  {
    icon: 'code',
    iconDir: 'start',
    label: 'Content1',
  },
  {
    type: 'sub-menu',
    icon: 'code',
    label: 'Hover Over Me',
    items: [
      {
        type: 'group',
        items: [
          {
            label: 'SubContent0',
          },
        ],
      },
      {
        label: 'SubContent1',
      },
    ],
  },
  {
    icon: 'code',
    iconDir: 'end',
    label: 'Content2',
  },
  {
    label: 'Content3',
  },
];

const meta: Meta<typeof SplitButton> = {
  component: SplitButton,
  title: 'Buttons/SplitButton',
  tags: ['split-button', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

export const Playground: Story = {
  args: {
    side: 'bottom',
    type: 'primary',
    children: 'Split button',
    menu: menuItems,
  },
};

// Button Types
export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary Split Button',
    menu: menuItems,
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Secondary Split Button',
    menu: menuItems,
  },
};

// Disabled States
export const PrimaryDisabled: Story = {
  args: {
    type: 'primary',
    children: 'Disabled Primary',
    menu: menuItems,
    disabled: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    type: 'secondary',
    children: 'Disabled Secondary',
    menu: menuItems,
    disabled: true,
  },
};

// Interactive
export const Interactive: Story = {
  args: {
    type: 'primary',
    children: 'Interactive Split Button',
    menu: menuItems,
    onClick: () => console.log('clicked'),
  },
};

// Layout Variants
export const FillWidth: Story = {
  args: {
    type: 'primary',
    children: 'Full Width Split Button',
    menu: menuItems,
    fillWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
