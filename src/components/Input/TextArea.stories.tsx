import { ChangeEvent, useEffect, useState } from "react";
import { TextAreaField as TextAreaFieldInput, TextAreaFieldProps } from "./TextArea";
import { Container } from "@/components/Container/Container";

const TextAreaField = ({
  value: valueProp,
  ...props
}: Omit<TextAreaFieldProps, "onChange">) => {
  const [value, setValue] = useState(valueProp);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <Container maxWidth="75%">
      <TextAreaFieldInput
        value={value}
        onChange={(inputValue: string, e?: ChangeEvent<HTMLTextAreaElement>) => {
          if (e) {
            e.preventDefault();
          }
          setValue(inputValue);
        }}
        {...props}
      />
    </Container>
  );
};

export default {
  component: TextAreaField,
  title: "Forms/Input/TextArea",
  tags: ["form-field", "input", "autodocs"],
  argTypes: {
    rows: {
      control: "number",
      default: 10,
    },
    value: { control: "text" },
    label: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    readOnly: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
};

export const Playground = {
  args: {
    label: "Label",
    rows: 5,
    disabled: false,
    placeholder: "Placeholder",
  },
};

export const Variations = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState(
      "This is a filled textarea with multiple lines of text.\nIt spans across several lines to demonstrate the component."
    );
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
            <TextAreaFieldInput
              label="Empty"
              placeholder="Enter text..."
              value={value1}
              onChange={setValue1}
            />
            <TextAreaFieldInput
              label="Filled"
              placeholder="Enter text..."
              value={value2}
              onChange={setValue2}
            />
            <TextAreaFieldInput
              label="Disabled"
              placeholder="Enter text..."
              disabled
              value={value2}
              onChange={setValue2}
            />
            <TextAreaFieldInput
              label="With Error"
              placeholder="Enter text..."
              error="This field is required"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>Row Sizes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextAreaFieldInput
              label="3 Rows"
              placeholder="Enter text..."
              rows={3}
              value={value3}
              onChange={setValue3}
            />
            <TextAreaFieldInput
              label="5 Rows (default)"
              placeholder="Enter text..."
              rows={5}
              value={value3}
              onChange={setValue3}
            />
            <TextAreaFieldInput
              label="10 Rows"
              placeholder="Enter text..."
              rows={10}
              value={value3}
              onChange={setValue3}
            />
          </div>
        </section>

        <section>
          <h3>Orientations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextAreaFieldInput
              label="Vertical (default)"
              placeholder="Enter text..."
              orientation="vertical"
              value={value1}
              onChange={setValue1}
            />
            <TextAreaFieldInput
              label="Horizontal"
              placeholder="Enter text..."
              orientation="horizontal"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>Label Position</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextAreaFieldInput
              label="Label Start"
              placeholder="Enter text..."
              dir="start"
              value={value1}
              onChange={setValue1}
            />
            <TextAreaFieldInput
              label="Label End"
              placeholder="Enter text..."
              dir="end"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>Read Only</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextAreaFieldInput
              label="Read Only"
              placeholder="Enter text..."
              readOnly
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
