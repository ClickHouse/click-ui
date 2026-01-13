import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  subcomponents: {
    "RadioGroup.Item": RadioGroup.Item as React.ComponentType<unknown>,
  },
  title: "Forms/RadioGroup",
  tags: ["radio", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  args: {
    disabled: false,
    children: (
      <>
        <RadioGroup.Item
          label="Radio Button1"
          value="RadioButton1"
        />
        <RadioGroup.Item
          label="Radio Button2"
          value="RadioButton2"
        />
        <RadioGroup.Item
          label="Radio Button3"
          value="RadioButton3"
        />
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
        <h3>States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Default</h4>
            <RadioGroup defaultValue="option1">
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              With Disabled Items
            </h4>
            <RadioGroup defaultValue="option1">
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2 (Disabled)"
                value="option2"
                disabled
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Disabled Group
            </h4>
            <RadioGroup
              defaultValue="option1"
              disabled
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
        </div>
      </section>

      <section>
        <h3>Layout</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Inline (Horizontal)
            </h4>
            <RadioGroup
              defaultValue="option1"
              inline={true}
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Stacked (Vertical)
            </h4>
            <RadioGroup
              defaultValue="option1"
              inline={false}
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
        </div>
      </section>

      <section>
        <h3>With Label</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <RadioGroup
            label="Choose an option"
            defaultValue="option1"
          >
            <RadioGroup.Item
              label="Option 1"
              value="option1"
            />
            <RadioGroup.Item
              label="Option 2"
              value="option2"
            />
            <RadioGroup.Item
              label="Option 3"
              value="option3"
            />
          </RadioGroup>
        </div>
      </section>

      <section>
        <h3>With Error</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <RadioGroup
            label="Choose an option"
            error="This field is required"
            defaultValue="option1"
          >
            <RadioGroup.Item
              label="Option 1"
              value="option1"
            />
            <RadioGroup.Item
              label="Option 2"
              value="option2"
            />
            <RadioGroup.Item
              label="Option 3"
              value="option3"
            />
          </RadioGroup>
        </div>
      </section>

      <section>
        <h3>Label Orientation</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Horizontal</h4>
            <RadioGroup
              label="Choose an option"
              orientation="horizontal"
              defaultValue="option1"
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Vertical</h4>
            <RadioGroup
              label="Choose an option"
              orientation="vertical"
              defaultValue="option1"
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
        </div>
      </section>

      <section>
        <h3>Label Position</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Start</h4>
            <RadioGroup
              label="Choose an option"
              dir="start"
              defaultValue="option1"
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>End</h4>
            <RadioGroup
              label="Choose an option"
              dir="end"
              defaultValue="option1"
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
        </div>
      </section>

      <section>
        <h3>Item Direction (RTL)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              LTR (default)
            </h4>
            <RadioGroup
              itemDir="ltr"
              defaultValue="option1"
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>RTL</h4>
            <RadioGroup
              itemDir="rtl"
              defaultValue="option1"
            >
              <RadioGroup.Item
                label="Option 1"
                value="option1"
              />
              <RadioGroup.Item
                label="Option 2"
                value="option2"
              />
              <RadioGroup.Item
                label="Option 3"
                value="option3"
              />
            </RadioGroup>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiRadioInput"],
      focus: [".cuiRadioInput"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
