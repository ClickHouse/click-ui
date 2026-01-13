import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { MultiAccordion } from "./MultiAccordion";

const meta: Meta<typeof MultiAccordion> = {
  component: MultiAccordion,
  subcomponents: {
    "MultiAccordion.Item": MultiAccordion.Item as React.ComponentType<unknown>,
  },
  title: "Accordion/MultiAccordion",
  tags: ["multi-accordion", "autodocs"],
  argTypes: {
    collapsible: { if: { arg: "type", eq: "single" } },
  },
};

export default meta;

type Story = StoryObj<typeof MultiAccordion>;

export const Playground: Story = {
  args: {
    type: "single",
    collapsible: true,
    showBorder: true,
    showCheck: true,
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          icon="user"
          title="Option 1"
          isCompleted
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
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
        <h3>Type: Single</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
          >
            <MultiAccordion.Item
              value="item1"
              title="Item 1"
            >
              Content for item 1
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Item 2"
            >
              Content for item 2
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item3"
              title="Item 3"
            >
              Content for item 3
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>Type: Multiple</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion type="multiple">
            <MultiAccordion.Item
              value="item1"
              title="Item 1"
            >
              Content for item 1
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Item 2"
            >
              Content for item 2
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item3"
              title="Item 3"
            >
              Content for item 3
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
            size="sm"
          >
            <MultiAccordion.Item
              value="item1"
              title="Small Size"
            >
              Small size content
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Small Size Item 2"
            >
              More small content
            </MultiAccordion.Item>
          </MultiAccordion>
          <MultiAccordion
            type="single"
            collapsible
            size="md"
          >
            <MultiAccordion.Item
              value="item1"
              title="Medium Size"
            >
              Medium size content
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Medium Size Item 2"
            >
              More medium content
            </MultiAccordion.Item>
          </MultiAccordion>
          <MultiAccordion
            type="single"
            collapsible
            size="lg"
          >
            <MultiAccordion.Item
              value="item1"
              title="Large Size"
            >
              Large size content
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Large Size Item 2"
            >
              More large content
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>With Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
          >
            <MultiAccordion.Item
              value="item1"
              icon="code"
              title="Code Item"
            >
              Content with code icon
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              icon="table"
              title="Table Item"
            >
              Content with table icon
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item3"
              icon="user"
              title="User Item"
            >
              Content with user icon
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>With Check Indicator</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
            showCheck
          >
            <MultiAccordion.Item
              value="item1"
              title="Completed Item"
              isCompleted
            >
              This item is marked as completed
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Incomplete Item"
              isCompleted={false}
            >
              This item is not completed
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item3"
              icon="code"
              title="With Icon & Check"
              isCompleted
            >
              Item with both icon and check indicator
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>With Border</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
            showBorder
          >
            <MultiAccordion.Item
              value="item1"
              title="Item with Border"
            >
              Content with border
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Another Bordered Item"
            >
              More content with border
            </MultiAccordion.Item>
          </MultiAccordion>
          <MultiAccordion
            type="single"
            collapsible
            showBorder={false}
          >
            <MultiAccordion.Item
              value="item1"
              title="Item without Border"
            >
              Content without border
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Another Borderless Item"
            >
              More content without border
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>Gap Variants</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
            gap="sm"
          >
            <MultiAccordion.Item
              value="item1"
              title="Small Gap"
            >
              Content with small gap
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Small Gap Item 2"
            >
              More content
            </MultiAccordion.Item>
          </MultiAccordion>
          <MultiAccordion
            type="single"
            collapsible
            gap="md"
          >
            <MultiAccordion.Item
              value="item1"
              title="Medium Gap"
            >
              Content with medium gap
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Medium Gap Item 2"
            >
              More content
            </MultiAccordion.Item>
          </MultiAccordion>
          <MultiAccordion
            type="single"
            collapsible
            gap="lg"
          >
            <MultiAccordion.Item
              value="item1"
              title="Large Gap"
            >
              Content with large gap
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Large Gap Item 2"
            >
              More content
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>Fill Width</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
            fillWidth
          >
            <MultiAccordion.Item
              value="item1"
              title="Full Width Item"
            >
              This accordion fills the full width
            </MultiAccordion.Item>
          </MultiAccordion>
          <MultiAccordion
            type="single"
            collapsible
            fillWidth={false}
          >
            <MultiAccordion.Item
              value="item1"
              title="Default Width Item"
            >
              This accordion has default width
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>Color Variants</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
          >
            <MultiAccordion.Item
              value="item1"
              color="default"
              title="Default Color"
            >
              Default color item
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              color="link"
              title="Link Color"
            >
              Link color item
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>

      <section>
        <h3>Default Open State</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MultiAccordion
            type="single"
            collapsible
            defaultValue="item2"
          >
            <MultiAccordion.Item
              value="item1"
              title="Item 1"
            >
              Content 1
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item2"
              title="Item 2 (Open by Default)"
            >
              This item is open by default
            </MultiAccordion.Item>
            <MultiAccordion.Item
              value="item3"
              title="Item 3"
            >
              Content 3
            </MultiAccordion.Item>
          </MultiAccordion>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiAccordionTrigger"],
      focus: [".cuiAccordionTrigger"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
