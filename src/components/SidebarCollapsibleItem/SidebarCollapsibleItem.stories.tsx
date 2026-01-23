import { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarCollapsibleItem } from "..";

const meta: Meta<typeof SidebarCollapsibleItem> = {
  component: SidebarCollapsibleItem,
  title: "Sidebar/CollapsibleItem",
  tags: ["sidebar", "collapsible-item", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarCollapsibleItem>;

export const Playground: Story = {
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
