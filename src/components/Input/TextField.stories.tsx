import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: "Forms/Input/TextField",
  tags: ["form-field", "input", "autodocs"],
  render: ({ value: valueProp, ...props }) => {
    const [value, setValue] = useState(valueProp);

    useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    return (
      <TextField
        {...props}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export default meta;

export const Playground: StoryObj<typeof TextField> = {
  args: {
    label: "Label",
    type: "text",
    placeholder: "Placeholder",
  },
};

export const Variations: StoryObj<typeof TextField> = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("Filled value");
    const [value3, setValue3] = useState("Clearable value");
    const [value4, setValue4] = useState("");

    return (
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          maxWidth: "600px",
        }}
      >
        <section>
          <h3>Input Types</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Text Input"
              type="text"
              placeholder="Enter text"
              value={value1}
              onChange={setValue1}
            />
            <TextField
              label="Email Input"
              type="email"
              placeholder="Enter email"
              value={value1}
              onChange={setValue1}
            />
            <TextField
              label="Tel Input"
              type="tel"
              placeholder="Enter phone"
              value={value1}
              onChange={setValue1}
            />
            <TextField
              label="URL Input"
              type="url"
              placeholder="Enter URL"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>States</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Default"
              placeholder="Placeholder"
              value={value1}
              onChange={setValue1}
            />
            <TextField
              label="Filled"
              placeholder="Placeholder"
              value={value2}
              onChange={setValue2}
            />
            <TextField
              label="Disabled"
              placeholder="Placeholder"
              disabled
              value={value2}
              onChange={setValue2}
            />
            <TextField
              label="With Error"
              placeholder="Placeholder"
              error="This field is required"
              value={value1}
              onChange={setValue1}
            />
            <TextField
              label="Loading"
              placeholder="Placeholder"
              loading
              value={value4}
              onChange={setValue4}
            />
          </div>
        </section>

        <section>
          <h3>With Clear Button</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Clearable"
              placeholder="Type something"
              clear
              value={value3}
              onChange={setValue3}
            />
          </div>
        </section>

        <section>
          <h3>With Start Content</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="With Icon"
              placeholder="Search..."
              value={value1}
              onChange={setValue1}
              startContent={<span style={{ padding: "0 0.5rem" }}>🔍</span>}
            />
          </div>
        </section>

        <section>
          <h3>With End Content</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="With Custom End"
              placeholder="Enter value"
              value={value1}
              onChange={setValue1}
              endContent={<span style={{ padding: "0 0.5rem" }}>@</span>}
            />
          </div>
        </section>

        <section>
          <h3>Orientations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Vertical (default)"
              placeholder="Placeholder"
              orientation="vertical"
              value={value1}
              onChange={setValue1}
            />
            <TextField
              label="Horizontal"
              placeholder="Placeholder"
              orientation="horizontal"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>Label Position</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Label Start"
              placeholder="Placeholder"
              dir="start"
              value={value1}
              onChange={setValue1}
            />
            <TextField
              label="Label End"
              placeholder="Placeholder"
              dir="end"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>Custom Label Color</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Custom Color"
              labelColor="rgb(193, 0, 0)"
              placeholder="Placeholder"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiInputElement"],
      focus: [".cuiInputElement"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
