import { Spacer, FullWidthTabs, Text } from "@/components";
import type { StoryObj } from "@storybook/react";

export default {
  component: FullWidthTabs,
  title: "Display/FullWidthTabs",
  tags: ["tabs", "autodocs"],
};

type Story = StoryObj<typeof FullWidthTabs>;

export const Playground: Story = {
  args: {
    defaultValue: "tab2",
    onValueChange: s => console.log(s),
    ariaLabel: "a full width simple tab component",
    children: (
      <div style={{ width: "700px" }}>
        <FullWidthTabs.TriggersList>
          <FullWidthTabs.Trigger
            value="tab1"
            key="tab1"
          >
            Tab 1
          </FullWidthTabs.Trigger>
          <FullWidthTabs.Trigger
            value="tab2"
            key="tab2"
          >
            Tab 2
          </FullWidthTabs.Trigger>
          <FullWidthTabs.Trigger
            value="tab3"
            key="tab3"
          >
            Tab 3
          </FullWidthTabs.Trigger>
        </FullWidthTabs.TriggersList>
        <FullWidthTabs.Content value="tab1">
          <Spacer />
          <Text>Tab 1 content</Text>
        </FullWidthTabs.Content>
        <FullWidthTabs.Content value="tab2">
          <Spacer />
          <Text>Tab 2 content</Text>
        </FullWidthTabs.Content>
        <FullWidthTabs.Content value="tab3">
          <Spacer />
          <Text>Tab 3 content</Text>
        </FullWidthTabs.Content>
      </div>
    ),
  },
};
