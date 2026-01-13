import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Spacer, FullWidthTabs, Text } from "@/components";

const meta: Meta<typeof FullWidthTabs> = {
  component: FullWidthTabs,
  subcomponents: {
    "FullWidthTabs.TriggersList":
      FullWidthTabs.TriggersList as React.ComponentType<unknown>,
    "FullWidthTabs.Trigger": FullWidthTabs.Trigger as React.ComponentType<unknown>,
    "FullWidthTabs.Content": FullWidthTabs.Content as React.ComponentType<unknown>,
  },
  title: "Display/FullWidthTabs",
  tags: ["tabs", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof FullWidthTabs>;

export const Playground: Story = {
  args: {
    defaultValue: "tab2",
    onValueChange: s => console.log(s),
    ariaLabel: "a full width simple tab component",
    children: (
      <div style={{ width: "700px" }}>
        <FullWidthTabs.TriggersList role="tablist">
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

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Default Full Width (3 Tabs)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ width: "600px" }}>
            <FullWidthTabs
              defaultValue="tab1"
              ariaLabel="full width tabs example"
            >
              <FullWidthTabs.TriggersList>
                <FullWidthTabs.Trigger value="tab1">Tab 1</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab2">Tab 2</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab3">Tab 3</FullWidthTabs.Trigger>
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
            </FullWidthTabs>
          </div>
        </div>
      </section>

      <section>
        <h3>Active Tab (Second Tab)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ width: "600px" }}>
            <FullWidthTabs
              defaultValue="tab2"
              ariaLabel="active tab example"
            >
              <FullWidthTabs.TriggersList>
                <FullWidthTabs.Trigger value="tab1">Tab 1</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab2">Tab 2</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab3">Tab 3</FullWidthTabs.Trigger>
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
            </FullWidthTabs>
          </div>
        </div>
      </section>

      <section>
        <h3>Many Tabs (5 Tabs)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ width: "700px" }}>
            <FullWidthTabs
              defaultValue="tab3"
              ariaLabel="many tabs example"
            >
              <FullWidthTabs.TriggersList>
                <FullWidthTabs.Trigger value="tab1">Tab 1</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab2">Tab 2</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab3">Tab 3</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab4">Tab 4</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab5">Tab 5</FullWidthTabs.Trigger>
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
              <FullWidthTabs.Content value="tab4">
                <Spacer />
                <Text>Tab 4 content</Text>
              </FullWidthTabs.Content>
              <FullWidthTabs.Content value="tab5">
                <Spacer />
                <Text>Tab 5 content</Text>
              </FullWidthTabs.Content>
            </FullWidthTabs>
          </div>
        </div>
      </section>

      <section>
        <h3>Custom Width Tabs</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ width: "700px" }}>
            <FullWidthTabs
              defaultValue="tab1"
              ariaLabel="custom width tabs"
            >
              <FullWidthTabs.TriggersList>
                <FullWidthTabs.Trigger
                  value="tab1"
                  width="150px"
                >
                  Custom 150px
                </FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger
                  value="tab2"
                  width="200px"
                >
                  Custom 200px
                </FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab3">Flexible</FullWidthTabs.Trigger>
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
            </FullWidthTabs>
          </div>
        </div>
      </section>

      <section>
        <h3>Disabled Tabs</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ width: "600px" }}>
            <FullWidthTabs
              defaultValue="tab1"
              ariaLabel="disabled tabs example"
            >
              <FullWidthTabs.TriggersList>
                <FullWidthTabs.Trigger value="tab1">Tab 1</FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger
                  value="tab2"
                  disabled
                >
                  Disabled Tab
                </FullWidthTabs.Trigger>
                <FullWidthTabs.Trigger value="tab3">Tab 3</FullWidthTabs.Trigger>
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
            </FullWidthTabs>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiFullWidthTrigger"],
      focus: [".cuiFullWidthTrigger"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
