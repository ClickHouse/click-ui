import { SidebarNavigationItem } from "@/components";

export default {
  component: SidebarNavigationItem,
  title: "Sidebar/NavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    icon: "user",
    selected: false,
    children: <a href="/profile">Profile</a>,
  },
};
