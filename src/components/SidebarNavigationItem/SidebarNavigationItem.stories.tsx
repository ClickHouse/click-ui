import { SidebarNavigationItem } from "@/components";

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

export const Collapsible = {
  args: {
    icon: "user",
    collapsible: true,
    label: "details",
    children: (
      <>
        <h2>Content</h2>
        <p>SomeText</p>
      </>
    ),
  },
};
