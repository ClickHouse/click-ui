import { Icon, CollapsibleNavigationItem as NavItem } from "@/components";

const CollapsibleNavigationItem = ({ label }: { label: string }) => (
  <NavItem>
    <NavItem.Header>
      <NavItem.Trigger />
      <Icon name="user" />
      {label}
    </NavItem.Header>
    <NavItem.Content>
      <h2>Content</h2>
      <p>SomeText</p>
    </NavItem.Content>
  </NavItem>
);

export default {
  component: CollapsibleNavigationItem,
  title: "Display/SidebarNavigation/CollapsibleNavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    label: "Profile",
  },
};
