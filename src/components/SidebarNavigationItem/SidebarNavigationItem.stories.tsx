import { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarNavigationItem } from "..";

const meta: Meta<typeof SidebarNavigationItem> = {
  component: SidebarNavigationItem,
  title: "Sidebar/NavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationItem>;

export const Playground: Story = {
  args: {
    icon: "code-in-square",
    selected: false,
    disabled: false,
    label: <a href="https://clickhouse.com/">Untitled Query</a>,
  },
};
