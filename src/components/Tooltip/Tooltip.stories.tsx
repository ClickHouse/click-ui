import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Text } from "@/components";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  subcomponents: {
    "Tooltip.Trigger": Tooltip.Trigger as React.ComponentType<unknown>,
    "Tooltip.Content": Tooltip.Content as React.ComponentType<unknown>,
  },
  title: "Display/Tooltip",
  tags: ["form-field", "tooltip", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {
    disabled: false,
  },
  render: args => (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Tooltip {...args}>
        <Tooltip.Trigger>
          <Text>Tooltip Trigger(Hover)</Text>
        </Tooltip.Trigger>

        <Tooltip.Content
          showArrow
          side="bottom"
        >
          Tooltip content
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}
    >
      <section>
        <h3>Arrow Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>With Arrow</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              Tooltip with arrow
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Without Arrow</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={false}
              side="bottom"
            >
              Tooltip without arrow
            </Tooltip.Content>
          </Tooltip>
        </div>
      </section>

      <section>
        <h3>Position Variants</h3>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Top</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="top"
            >
              Top tooltip
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Bottom</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              Bottom tooltip
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Left</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="left"
            >
              Left tooltip
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Right</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="right"
            >
              Right tooltip
            </Tooltip.Content>
          </Tooltip>
        </div>
      </section>

      <section>
        <h3>State Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Tooltip
            open={true}
            disabled={false}
          >
            <Tooltip.Trigger>
              <Text>Enabled</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              Enabled tooltip
            </Tooltip.Content>
          </Tooltip>

          <Tooltip
            open={true}
            disabled={true}
          >
            <Tooltip.Trigger>
              <Text>Disabled</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              This tooltip is disabled
            </Tooltip.Content>
          </Tooltip>
        </div>
      </section>

      <section>
        <h3>Content Length Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Short</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              Short
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Medium</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              This is a medium length tooltip content
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Long</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              This is a much longer tooltip content that demonstrates how tooltips handle
              extended text. It should wrap appropriately.
            </Tooltip.Content>
          </Tooltip>
        </div>
      </section>

      <section>
        <h3>Max Width Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Default Width</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              This tooltip uses the default max width behavior for its content wrapping.
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Custom Width</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
              maxWidth="200px"
            >
              This tooltip has a custom max width of 200px applied, so it wraps at that
              point.
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Wide Width</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
              maxWidth="400px"
            >
              This tooltip has a much wider max width of 400px, allowing more text to fit
              on a single line before wrapping occurs.
            </Tooltip.Content>
          </Tooltip>
        </div>
      </section>

      <section>
        <h3>Side Offset Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Default Offset</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
            >
              Default offset (6px)
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>No Offset</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
              sideOffset={0}
            >
              No offset (0px)
            </Tooltip.Content>
          </Tooltip>

          <Tooltip open={true}>
            <Tooltip.Trigger>
              <Text>Large Offset</Text>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow={true}
              side="bottom"
              sideOffset={20}
            >
              Large offset (20px)
            </Tooltip.Content>
          </Tooltip>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiTooltipContent"],
      focus: [".cuiTooltipContent"],
      focusVisible: [".cuiTooltipContent"],
    },
  },
};
