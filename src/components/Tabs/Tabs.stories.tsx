import { Tab, Tabs } from "@/components";
import type { StoryObj } from "@storybook/react";

export default {
  component: Tabs,
  title: "Tabs",
  tags: ["tabs", "autodocs"],
};

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: "tab2",
    onValueChange: s => console.log(s),
    ariaLabel: "a simple tab component",
    children: [
      <Tab label="tab1" key="tab1" value="tab1">
        <p>Tab 1 content</p>
      </Tab>,
      <Tab label="tab2" key="tab2" value="tab2">
        <p>Tab 2 content</p>
      </Tab>,
      <Tab label="tab3" key="tab3" value="tab3">
        <p>Tab 3 content</p>
      </Tab>,
    ],
  },
};

export const Hover = {
  args: {
    children: [
      <Tab label="tab1" key="tab1" value="tab1">
        <p>Tab 1 content</p>
      </Tab>,
    ],
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Selected = {
  args: {
    children: [
      <Tab label="tab1" key="tab1" value="tab1">
        <p>Tab 1 content</p>
      </Tab>,
    ],
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};
