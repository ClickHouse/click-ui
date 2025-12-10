import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenuProps } from "@radix-ui/react-context-menu";
import { ContextMenu, ContextMenuItemProps } from "./ContextMenu";
import { styled } from "styled-components";

interface ContextMenuExampleProps extends ContextMenuProps {
  disabled?: boolean;
  showArrow?: boolean;
  side: "top" | "right" | "left" | "bottom";
}

const GridCenter = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const Trigger = styled(GridCenter)`
  border: 2px currentColor dashed;
`;

const ContextMenuExample = ({
  showArrow,
  disabled,
  side,
  ...props
}: ContextMenuExampleProps) => {
  return (
    <GridCenter>
      <ContextMenu {...props}>
        <ContextMenu.Trigger disabled={disabled}>
          <Trigger>ContextMenu Trigger</Trigger>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          showArrow={showArrow}
          side={side}
        >
          <ContextMenu.Group>
            <ContextMenu.Item>Content0</ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Item icon="activity">Content1 long text content</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Hover over</ContextMenu.SubTrigger>
            <ContextMenu.Content sub>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Sub>
          <ContextMenu.Item
            icon="activity"
            iconDir="end"
          >
            Content2
          </ContextMenu.Item>
          <ContextMenu.Item disabled>Content3</ContextMenu.Item>
          <ContextMenu.Item type="danger">Delete content</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </GridCenter>
  );
};

const meta: Meta<typeof ContextMenuExample> = {
  component: ContextMenuExample,
  subcomponents: {
    "ContextMenu.Trigger": ContextMenu.Trigger as React.ComponentType<unknown>,
    "ContextMenu.Content": ContextMenu.Content as React.ComponentType<unknown>,
    "ContextMenu.SubTrigger": ContextMenu.SubTrigger as React.ComponentType<unknown>,
    "ContextMenu.Group": ContextMenu.Group as React.ComponentType<unknown>,
    "ContextMenu.Sub": ContextMenu.Sub as React.ComponentType<unknown>,
    "ContextMenu.Item": ContextMenu.Item as React.ComponentType<ContextMenuItemProps>,
  },
  title: "Display/ContextMenu",
  tags: ["form-field", "dropdown", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    showArrow: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenuExample>;

export const Playground: Story = {
  args: {
    showArrow: true,
    side: "left",
  },
};
