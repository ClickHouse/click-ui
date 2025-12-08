import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Text } from "..";

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
