import { SidebarCollapsibleTitle } from "@/components";

export default {
  component: SidebarCollapsibleTitle,
  title: "Sidebar/CollapsibleTitle",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    icon: "user",
    label: "Profile",
    selected: false,
    children: (
      <>
        <h2>Content</h2>
        <p>SomeText</p>
      </>
    ),
  },
};
