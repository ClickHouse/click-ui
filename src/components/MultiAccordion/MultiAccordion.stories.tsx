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
