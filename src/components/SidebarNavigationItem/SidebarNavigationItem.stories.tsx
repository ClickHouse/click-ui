import { SidebarNavigationItem } from "@/components";

export default {
  component: SidebarNavigationItem,
  title: "Sidebar/NavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    icon: "code-in-square",
    selected: false,
    children: <a href="/profile">Untitled Query</a>,
  },
};
