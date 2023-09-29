import { Menu, SplitButton } from "./SplitButton";

const menuItems: Array<Menu> = [
  {
    type: "group",
    items: [
      {
        label: "Content0",
      },
    ],
  },
  {
    icon: "code",
    iconDir: "start",
    label: "Content1",
  },
  {
    type: "sub-menu",
    icon: "code",
    label: "Hover Over Me",
    items: [
      {
        type: "group",
        items: [
          {
            label: "SubContent0",
          },
        ],
      },
      {
        label: "SubContent1",
      },
    ],
  },
  {
    icon: "code",
    iconDir: "end",
    label: "Content2",
  },
  {
    label: "Content3",
  },
];

export default {
  component: SplitButton,
  title: "Buttons/SplitButton",
  tags: ["split-button", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    type: { control: "inline-radio", options: ["primary", "secondary"] },
    side: { control: "select", options: ["top", "bottom"] },
  },
};

export const Playground = {
  args: {
    side: "bottom",
    type: "primary",
    children: "Split button",
    menu: menuItems,
  },
};
