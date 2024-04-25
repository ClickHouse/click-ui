import { SidebarNavigationItem } from "@/components";

export default {
  component: SidebarNavigationItem,
  title: "Sidebar/NavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
  argTypes: {
    type: {
      options: ["main", "sqlSidebar"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    icon: "code-in-square",
    selected: false,
    disabled: false,
    label: <a href="https://clickhouse.com/">Untitled Query</a>,
  },
};
