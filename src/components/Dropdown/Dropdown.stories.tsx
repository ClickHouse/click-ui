import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Dropdown } from "./Dropdown";
import { GridCenter } from "@/components/commonElement";
import { Button } from "@/components";
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

export const Variations: Story = {
  args: {
    open: true,
    defaultOpen: true,
  },
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}
    >
      <section>
        <h3>Item Types</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Dropdown open={true}>
            <Dropdown.Trigger>Default Items</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item type="default">Default Item 1</Dropdown.Item>
              <Dropdown.Item type="default">Default Item 2</Dropdown.Item>
              <Dropdown.Item type="default">Default Item 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>

          <Dropdown open={true}>
            <Dropdown.Trigger>Danger Items</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item>Regular Item</Dropdown.Item>
              <Dropdown.Item type="danger">Delete</Dropdown.Item>
              <Dropdown.Item type="danger">Remove</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section>
        <h3>Item States</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Dropdown open={true}>
            <Dropdown.Trigger>Item States</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item>Normal Item</Dropdown.Item>
              <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
              <Dropdown.Item data-state="checked">Checked Item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section>
        <h3>Items with Icons</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Dropdown open={true}>
            <Dropdown.Trigger>Icon Start</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item icon="activity">Activity</Dropdown.Item>
              <Dropdown.Item icon="user">Profile</Dropdown.Item>
              <Dropdown.Item icon="settings">Settings</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>

          <Dropdown open={true}>
            <Dropdown.Trigger>Icon End</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item
                icon="activity"
                iconDir="end"
              >
                Activity
              </Dropdown.Item>
              <Dropdown.Item
                icon="user"
                iconDir="end"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                icon="settings"
                iconDir="end"
              >
                Settings
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section>
        <h3>Arrow Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Dropdown open={true}>
            <Dropdown.Trigger>With Arrow</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>

          <Dropdown open={true}>
            <Dropdown.Trigger>Without Arrow</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={false}
              side="bottom"
            >
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
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
          <Dropdown open={true}>
            <Dropdown.Trigger>Top</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="top"
            >
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>

          <Dropdown open={true}>
            <Dropdown.Trigger>Bottom</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>

          <Dropdown open={true}>
            <Dropdown.Trigger>Left</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="left"
            >
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>

          <Dropdown open={true}>
            <Dropdown.Trigger>Right</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="right"
            >
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section>
        <h3>With Sub-menus</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Dropdown open={true}>
            <Dropdown.Trigger>Nested Menu</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Item>Regular Item</Dropdown.Item>
              <Dropdown.Sub>
                <Dropdown.Trigger sub>More Options</Dropdown.Trigger>
                <Dropdown.Content sub>
                  <Dropdown.Item>Sub Item 1</Dropdown.Item>
                  <Dropdown.Item>Sub Item 2</Dropdown.Item>
                  <Dropdown.Item>Sub Item 3</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Sub>
              <Dropdown.Item type="danger">Delete</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>

      <section>
        <h3>With Groups</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Dropdown open={true}>
            <Dropdown.Trigger>Grouped Items</Dropdown.Trigger>
            <Dropdown.Content
              showArrow={true}
              side="bottom"
            >
              <Dropdown.Group>
                <Dropdown.Item>Group 1 - Item 1</Dropdown.Item>
                <Dropdown.Item>Group 1 - Item 2</Dropdown.Item>
              </Dropdown.Group>
              <Dropdown.Item>Ungrouped Item</Dropdown.Item>
              <Dropdown.Item>Another Item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiMenuItem", ".cuiSubTrigger", ".cuiTrigger"],
      focus: [".cuiMenuItem", ".cuiSubTrigger", ".cuiTrigger"],
      focusVisible: [".cuiMenuItem", ".cuiSubTrigger", ".cuiTrigger"],
    },
  },
};
