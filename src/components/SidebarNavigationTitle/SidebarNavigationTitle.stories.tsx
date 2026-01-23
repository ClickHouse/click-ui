import { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarNavigationTitle } from "..";

const meta: Meta<typeof SidebarNavigationTitle> = {
  component: SidebarNavigationTitle,
  title: "Sidebar/NavigationTitle",
  tags: ["sidebar", "navigation-title", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationTitle>;

export const Playground: Story = {
  args: {
    icon: "table",
    selected: false,
    label: <a href="/profile">Tables</a>,
  },
};
