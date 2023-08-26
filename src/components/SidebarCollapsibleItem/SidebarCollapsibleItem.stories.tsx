import { SidebarCollapsibleItem } from "@/components";

export default {
  component: SidebarCollapsibleItem,
  title: "Sidebar/CollapsibleItem",
  tags: ["sidebar", "collapsible-item", "autodocs"],
};

export const Default = {
  args: {
    icon: "table",
    selected: false,
    label: <span>system-table</span>,
    children: (
      <>
        <h2>Content</h2>
        <p>SomeText</p>
      </>
    ),
  },
};
