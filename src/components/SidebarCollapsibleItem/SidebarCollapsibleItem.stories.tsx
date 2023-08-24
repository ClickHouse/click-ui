import { SidebarCollapsibleItem } from "@/components";

export default {
  component: SidebarCollapsibleItem,
  title: "Sidebar/Collapsibletem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    icon: "user",
    selected: false,
    label: <span>Profile</span>,
    children: (
      <>
        <h2>Content</h2>
        <p>SomeText</p>
      </>
    ),
  },
};
