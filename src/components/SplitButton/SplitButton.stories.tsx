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
  // SplitButton renders the shared BaseButton twice (primary action + secondary
  // dropdown trigger). The decorator gives every story the same padded harness so
  // the visual-regression snapshots screenshot a stable region that captures the
  // BaseButton rendering in each variant/state.
  decorators: [
    Story => (
      <div
        data-testid="split-button-harness"
        style={{
          display: 'inline-flex',
          padding: '24px',
          background: '#f5f5f5',
        }}
      >
        <Story />
      </div>
    ),
  ],
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

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Split button',
    menu: menuItems,
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Split button',
    menu: menuItems,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    type: 'primary',
    disabled: true,
    children: 'Split button',
    menu: menuItems,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    type: 'secondary',
    disabled: true,
    children: 'Split button',
    menu: menuItems,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    type: 'primary',
    icon: 'code',
    iconDir: 'start',
    children: 'Split button',
    menu: menuItems,
  },
};

export const FillWidth: Story = {
  args: {
    type: 'primary',
    fillWidth: true,
    children: 'Split button',
    menu: menuItems,
  },
};
