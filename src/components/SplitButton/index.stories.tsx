import { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, SplitButton } from '@/components/SplitButton';

const menuItems: Array<Menu> = [
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
