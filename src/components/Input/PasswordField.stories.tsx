import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordField } from "./PasswordField";

const meta: Meta<typeof PasswordField> = {
  component: PasswordField,
  title: "Forms/Input/PasswordField",
  tags: ["form-field", "input", "autodocs"],
  render: ({ value: valueProp, ...props }) => {
    const [value, setValue] = useState(valueProp);

    useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    return (
      <PasswordField
        {...props}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export default meta;

export const Playground: StoryObj<typeof PasswordField> = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};

export const Variations: StoryObj<typeof PasswordField> = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("password123");
    const [value3, setValue3] = useState("");

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
          <h3>States</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <PasswordField
              label="Empty"
              placeholder="Enter password"
              value={value1}
              onChange={setValue1}
            />
            <PasswordField
              label="Filled"
              placeholder="Enter password"
              value={value2}
              onChange={setValue2}
            />
            <PasswordField
              label="Disabled"
              placeholder="Enter password"
              disabled
              value={value2}
              onChange={setValue2}
            />
            <PasswordField
              label="With Error"
              placeholder="Enter password"
              error="Password is required"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>Orientations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <PasswordField
              label="Vertical (default)"
              placeholder="Enter password"
              orientation="vertical"
              value={value3}
              onChange={setValue3}
            />
            <PasswordField
              label="Horizontal"
              placeholder="Enter password"
              orientation="horizontal"
              value={value3}
              onChange={setValue3}
            />
          </div>
        </section>

        <section>
          <h3>Label Position</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <PasswordField
              label="Label Start"
              placeholder="Enter password"
              dir="start"
              value={value3}
              onChange={setValue3}
            />
            <PasswordField
              label="Label End"
              placeholder="Enter password"
              dir="end"
              value={value3}
              onChange={setValue3}
            />
          </div>
        </section>

        <section>
          <h3>With Value (Toggle Visibility)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <PasswordField
              label="Password"
              placeholder="Enter password"
              value={value2}
              onChange={setValue2}
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
