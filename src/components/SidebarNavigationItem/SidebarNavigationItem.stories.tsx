import { SidebarNavigationItem } from "@/components/SidebarNavigationItem/SidebarNavigationItem";

export default {
  component: SidebarNavigationItem,
  title: "SidebarNavigationItem",
  tags: ["sidebar", "navigation-item"],
};

export const Default = {
  args: {
    icon: "user",
    children: <a href="/profile">Profile</a>,
  },
};
