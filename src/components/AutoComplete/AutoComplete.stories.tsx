import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { selectOptions } from "@/components/Select/selectOptions";
interface AutoCompleteExampleProps extends Omit<
  AutoCompleteProps,
  "options" | "children"
> {
  childrenType: "children" | "options";
}

const AutoCompleteExample = ({
  childrenType,
  value,
  ...props
}: AutoCompleteExampleProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  if (childrenType === "options") {
    return (
      <AutoComplete
        value={selectedValue}
        onSelect={setSelectedValue}
        options={selectOptions}
        {...props}
      />
    );
  }
  return (
    <AutoComplete
      onSelect={setSelectedValue}
      {...props}
    >
      <AutoComplete.Group heading="Group label">
        <AutoComplete.Item
          value="content0"
          icon="user"
        >
          Content0
        </AutoComplete.Item>
      </AutoComplete.Group>
      <div>
        <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
      </div>
      <AutoComplete.Item
        value="content2"
        disabled
      >
        Content2
      </AutoComplete.Item>
      <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
      <AutoComplete.Item
        value="content4"
        label="Content4"
      />
    </AutoComplete>
  );
};

const meta: Meta<typeof AutoCompleteExample> = {
  component: AutoCompleteExample,
  subcomponents: {
    "AutoComplete.Group": AutoComplete.Group as React.ComponentType<unknown>,
    "AutoComplete.Item": AutoComplete.Item as React.ComponentType<unknown>,
  },
  title: "Display/AutoComplete",
  tags: ["form-field", "autocomplete", "autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    value: { control: "text" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
    childrenType: { control: "inline-radio", options: ["children", "options"] },
  },
};

export default meta;

type Story = StoryObj<typeof AutoCompleteExample>;

export const Playground: Story = {
  args: {
    label: "Label",
    childrenType: "children",
  },
  parameters: {
    docs: {
      source: {
        transform: (
          _: string,
          story: { args: AutoCompleteExampleProps; [x: string]: unknown }
        ) => {
          const { childrenType, value, ...props } = story.args;
          return `<AutoComplete\n  value={${value}}\n${Object.entries(props)
            .flatMap(([key, value]) =>
              typeof value === "boolean"
                ? value
                  ? `  ${key}`
                  : []
                : `  ${key}=${typeof value == "string" ? `"${value}"` : `{${value}}`}`
            )
            .join("\n")}
${
  childrenType === "options"
    ? `options={${JSON.stringify(selectOptions, null, 2)}}\n/`
    : ""
}>
${
  childrenType !== "options"
    ? `
    <AutoComplete.Group heading="Group label">
      <AutoComplete.Item value="content0" icon="user>
        Content0
      </AutoComplete.Item>
    </AutoComplete.Group>
    <div>
      <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
    </div>
    <AutoComplete.Item
      value="content2"
      disabled
    >
      Content2
    </AutoComplete.Item>
    <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
</AutoComplete>
`
    : ""
}`;
        },
      },
    },
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
            <AutoComplete onSelect={value => console.log("Selected:", value)}>
              <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
              <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
              <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
            </AutoComplete>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Disabled</h4>
            <AutoComplete
              disabled
              onSelect={value => console.log("Selected:", value)}
            >
              <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
              <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
              <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
            </AutoComplete>
          </div>
        </div>
      </section>

      <section>
        <h3>With Label</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AutoComplete
            label="Select an option"
            onSelect={value => console.log("Selected:", value)}
          >
            <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
            <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
            <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
          </AutoComplete>
        </div>
      </section>

      <section>
        <h3>With Error</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AutoComplete
            label="Select an option"
            error="This field is required"
            onSelect={value => console.log("Selected:", value)}
          >
            <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
            <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
            <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
          </AutoComplete>
        </div>
      </section>

      <section>
        <h3>Label Orientation</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Horizontal</h4>
            <AutoComplete
              label="Select an option"
              orientation="horizontal"
              onSelect={value => console.log("Selected:", value)}
            >
              <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
              <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
              <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
            </AutoComplete>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Vertical</h4>
            <AutoComplete
              label="Select an option"
              orientation="vertical"
              onSelect={value => console.log("Selected:", value)}
            >
              <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
              <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
              <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
            </AutoComplete>
          </div>
        </div>
      </section>

      <section>
        <h3>Label Position</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Start</h4>
            <AutoComplete
              label="Select an option"
              dir="start"
              onSelect={value => console.log("Selected:", value)}
            >
              <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
              <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
              <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
            </AutoComplete>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>End</h4>
            <AutoComplete
              label="Select an option"
              dir="end"
              onSelect={value => console.log("Selected:", value)}
            >
              <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
              <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
              <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
            </AutoComplete>
          </div>
        </div>
      </section>

      <section>
        <h3>With Groups</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AutoComplete onSelect={value => console.log("Selected:", value)}>
            <AutoComplete.Group heading="Fruits">
              <AutoComplete.Item value="apple">Apple</AutoComplete.Item>
              <AutoComplete.Item value="banana">Banana</AutoComplete.Item>
              <AutoComplete.Item value="cherry">Cherry</AutoComplete.Item>
            </AutoComplete.Group>
            <AutoComplete.Group heading="Vegetables">
              <AutoComplete.Item value="carrot">Carrot</AutoComplete.Item>
              <AutoComplete.Item value="potato">Potato</AutoComplete.Item>
              <AutoComplete.Item value="tomato">Tomato</AutoComplete.Item>
            </AutoComplete.Group>
          </AutoComplete>
        </div>
      </section>

      <section>
        <h3>With Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AutoComplete onSelect={value => console.log("Selected:", value)}>
            <AutoComplete.Item
              value="user"
              icon="user"
            >
              User Profile
            </AutoComplete.Item>
            <AutoComplete.Item
              value="settings"
              icon="gear"
            >
              Settings
            </AutoComplete.Item>
            <AutoComplete.Item
              value="slide-out"
              icon="slide-out"
            >
              Logout
            </AutoComplete.Item>
          </AutoComplete>
        </div>
      </section>

      <section>
        <h3>With Disabled Items</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AutoComplete onSelect={value => console.log("Selected:", value)}>
            <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
            <AutoComplete.Item
              value="option2"
              disabled
            >
              Option 2 (Disabled)
            </AutoComplete.Item>
            <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
            <AutoComplete.Item
              value="option4"
              disabled
            >
              Option 4 (Disabled)
            </AutoComplete.Item>
          </AutoComplete>
        </div>
      </section>

      <section>
        <h3>Using Options Prop</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AutoComplete
            options={selectOptions}
            onSelect={value => console.log("Selected:", value)}
          />
        </div>
      </section>

      <section>
        <h3>Custom Placeholder</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AutoComplete
            placeholder="Type to search..."
            onSelect={value => console.log("Selected:", value)}
          >
            <AutoComplete.Item value="option1">Option 1</AutoComplete.Item>
            <AutoComplete.Item value="option2">Option 2</AutoComplete.Item>
            <AutoComplete.Item value="option3">Option 3</AutoComplete.Item>
          </AutoComplete>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ['[data-testid="autocomplete-trigger"]'],
      focus: ['[data-testid="autocomplete-trigger"]'],
    },
    chromatic: {
      delay: 300,
    },
  },
};
