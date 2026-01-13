import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Spacer, Tabs, Text } from "@/components";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  subcomponents: {
    "Tabs.TriggersList": Tabs.TriggersList as React.ComponentType<unknown>,
    "Tabs.Trigger": Tabs.Trigger as React.ComponentType<unknown>,
    "Tabs.Content": Tabs.Content as React.ComponentType<unknown>,
  },
  title: "Display/Tabs",
  tags: ["tabs", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  args: {
    defaultValue: "tab2",
    onValueChange: s => console.log(s),
    ariaLabel: "a simple tab component",
    children: (
      <>
        <Tabs.TriggersList>
          <Tabs.Trigger
            value="tab1"
            key="tab1"
          >
            Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            key="tab2"
          >
            Tab 2
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab3"
            key="tab3"
          >
            Tab 3
          </Tabs.Trigger>
        </Tabs.TriggersList>
        <Tabs.Content value="tab1">
          <Spacer />
          <Text>Tab 1 content</Text>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <Spacer />
          <Text>Tab 2 content</Text>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <Spacer />
          <Text>Tab 3 content</Text>
        </Tabs.Content>
      </>
    ),
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Default State</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Tabs
            defaultValue="tab1"
            ariaLabel="default tabs example"
          >
            <Tabs.TriggersList>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.TriggersList>
            <Tabs.Content value="tab1">
              <Spacer />
              <Text>Tab 1 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <Spacer />
              <Text>Tab 2 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <Spacer />
              <Text>Tab 3 content</Text>
            </Tabs.Content>
          </Tabs>
        </div>
      </section>

      <section>
        <h3>Active Tab (Second Tab)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Tabs
            defaultValue="tab2"
            ariaLabel="active tab example"
          >
            <Tabs.TriggersList>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.TriggersList>
            <Tabs.Content value="tab1">
              <Spacer />
              <Text>Tab 1 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <Spacer />
              <Text>Tab 2 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <Spacer />
              <Text>Tab 3 content</Text>
            </Tabs.Content>
          </Tabs>
        </div>
      </section>

      <section>
        <h3>Many Tabs</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Tabs
            defaultValue="tab3"
            ariaLabel="many tabs example"
          >
            <Tabs.TriggersList>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
              <Tabs.Trigger value="tab4">Tab 4</Tabs.Trigger>
              <Tabs.Trigger value="tab5">Tab 5</Tabs.Trigger>
              <Tabs.Trigger value="tab6">Tab 6</Tabs.Trigger>
            </Tabs.TriggersList>
            <Tabs.Content value="tab1">
              <Spacer />
              <Text>Tab 1 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <Spacer />
              <Text>Tab 2 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <Spacer />
              <Text>Tab 3 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab4">
              <Spacer />
              <Text>Tab 4 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab5">
              <Spacer />
              <Text>Tab 5 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab6">
              <Spacer />
              <Text>Tab 6 content</Text>
            </Tabs.Content>
          </Tabs>
        </div>
      </section>

      <section>
        <h3>Disabled Tabs</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Tabs
            defaultValue="tab1"
            ariaLabel="disabled tabs example"
          >
            <Tabs.TriggersList>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger
                value="tab2"
                disabled
              >
                Disabled Tab
              </Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.TriggersList>
            <Tabs.Content value="tab1">
              <Spacer />
              <Text>Tab 1 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <Spacer />
              <Text>Tab 2 content</Text>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <Spacer />
              <Text>Tab 3 content</Text>
            </Tabs.Content>
          </Tabs>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiTrigger"],
      focus: [".cuiTrigger"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
