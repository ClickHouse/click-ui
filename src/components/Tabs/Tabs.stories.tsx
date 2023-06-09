import { Tabs } from "@/components";
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
    children: (
      <>
        <Tabs.TriggersList>
          <Tabs.Trigger value="tab1" key="tab1">
            tab1
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" key="tab2">
            tab2
          </Tabs.Trigger>
          <Tabs.Trigger value="tab3" key="tab3">
            tab3
          </Tabs.Trigger>
        </Tabs.TriggersList>
        <Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
        <Tabs.Content value="tab2">Tab 2 content</Tabs.Content>
        <Tabs.Content value="tab3">Tab 3 content</Tabs.Content>
      </>
    ),
  },
};

export const Hover = {
  args: {
    children: [
      <>
        <Tabs.TriggersList>
          <Tabs.Trigger value="tab1" key="tab1">
            tab1
          </Tabs.Trigger>
        </Tabs.TriggersList>
        <Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
      </>,
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
      <>
        <Tabs.TriggersList>
          <Tabs.Trigger value="tab1" data-state="active" key="tab1">
            tab1
          </Tabs.Trigger>
        </Tabs.TriggersList>
        <Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
      </>,
    ],
  },
};
