import { SidebarNavigationTitle } from "@/components";

export default {
  component: SidebarNavigationTitle,
  title: "Sidebar/NavigationTitle",
  tags: ["sidebar", "navigation-title", "autodocs"],
  argTypes: {
    type: {
      options: ["main", "sqlSidebar"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    icon: "table",
    selected: false,
    label: <a href="/profile">Tables</a>,
  },
};
