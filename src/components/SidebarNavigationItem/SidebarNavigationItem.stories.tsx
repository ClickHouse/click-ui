import { Icon, SidebarNavigationItem } from "@/components";

export default {
  component: SidebarNavigationItem,
  title: "Sidebar/NavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    icon: "user",
    children: <a href="/profile">Profile</a>,
  },
};

export const Collapsible = {
  args: {
    icon: "user",
    collapsible: true,
    label: (
      <>
        <Icon name="user" />
        <span>Profile</span>
      </>
    ),
    children: (
      <>
        <h2>Content</h2>
        <p>SomeText</p>
      </>
    ),
  },
};
