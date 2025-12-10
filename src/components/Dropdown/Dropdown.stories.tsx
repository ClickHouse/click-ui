import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Dropdown } from "./Dropdown";
import { GridCenter } from "../commonElement";
import { Button } from "..";
import { Key } from "react";
import type { DropdownItemProps } from "./Dropdown";

interface DropdownExampleProps extends DropdownMenuProps {
  disabled?: boolean;
  showArrow?: boolean;
  side: "top" | "right" | "left" | "bottom";
  type: "text" | "button";
  itemCount: number;
}

const DropdownExample = ({
  showArrow,
  disabled,
  side,
  itemCount,
  ...props
}: DropdownExampleProps) => {
  const items = Array.from({ length: itemCount }, (_, i) => `Item ${i + 1}`);
  return (
    <GridCenter>
      <Dropdown {...props}>
        <Dropdown.Trigger disabled={disabled}>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content
          showArrow={showArrow}
          side={side}
        >
          <Dropdown.Group>
            <Dropdown.Item data-state="checked">Content0</Dropdown.Item>
          </Dropdown.Group>
          {items.map((item: string, index: Key | null | undefined) => (
            <Dropdown.Item key={index}>{item}</Dropdown.Item>
          ))}
          <Dropdown.Item icon="activity">Content1 long text content</Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.Trigger sub>Hover over</Dropdown.Trigger>
            <Dropdown.Content sub>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Sub>
          <Dropdown.Item
            icon="activity"
            iconDir="end"
          >
            Activity
          </Dropdown.Item>
          <Dropdown.Item disabled>Content3</Dropdown.Item>
          <Dropdown.Item type="danger">Delete content</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
      <Dropdown {...props}>
        <Dropdown.Trigger disabled={disabled}>
          <Button>Dropdown Trigger Button</Button>
        </Dropdown.Trigger>
        <Dropdown.Content
          showArrow={showArrow}
          side={side}
        >
          <Dropdown.Group>
            <Dropdown.Item>Content0</Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Item icon="activity">Content1 long text content</Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.Trigger sub>Hover over</Dropdown.Trigger>
            <Dropdown.Content sub>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Sub>
          <Dropdown.Item
            icon="activity"
            iconDir="end"
          >
            Content2
          </Dropdown.Item>
          <Dropdown.Item disabled>Content3</Dropdown.Item>
          <Dropdown.Item type="danger">Delete content</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </GridCenter>
  );
};

const meta: Meta<typeof DropdownExample> = {
  component: DropdownExample,
  subcomponents: {
    "Dropdown.Trigger": Dropdown.Trigger as React.ComponentType<unknown>,
    "Dropdown.Content": Dropdown.Content as React.ComponentType<unknown>,
    "Dropdown.Group": Dropdown.Group as React.ComponentType<unknown>,
    "Dropdown.Sub": Dropdown.Sub as React.ComponentType<unknown>,
    "Dropdown.Item": Dropdown.Item as React.ComponentType<DropdownItemProps>,
  },
  title: "Display/Dropdown",
  tags: ["form-field", "dropdown", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    showArrow: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
    itemCount: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description: "Number of items to display",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownExample>;

export const Playground: Story = {
  args: {
    side: "bottom",
    itemCount: 0,
  },
};
