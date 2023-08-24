import { SidebarNavigationTitle } from "@/components";

export default {
  component: SidebarNavigationTitle,
  title: "Sidebar/NavigationTitle",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    icon: "table",
    selected: false,
    children: <a href="/profile">Tables</a>,
  },
};
