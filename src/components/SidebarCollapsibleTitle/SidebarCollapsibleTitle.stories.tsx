import { SidebarCollapsibleTitle, SidebarNavigationItem } from "@/components";

export default {
  component: SidebarCollapsibleTitle,
  title: "Sidebar/CollapsibleTitle",
  tags: ["sidebar", "collapsible-title", "autodocs"],
  argTypes: {
    type: {
      options: ["main", "sqlSidebar"],
      control: { type: "radio" },
    },
  },
};

export const Default = {
  args: {
    icon: "code",
    label: "Queries",
    selected: false,
    children: (
      <>
        <SidebarNavigationItem
          level={1}
          icon="code-in-square"
          label="Untitled Query 1"
        />
        <SidebarNavigationItem
          level={2}
          icon="code-in-square"
          label="Untitled Query 2"
        />
      </>
    ),
  },
};
