import { useEffect, useState } from "react";
import { NumberField as NumberFieldInput, NumberFieldProps } from "./NumberField";
import { Container } from "@/components/Container/Container";

const NumberField = ({
  value: valueProp,
  ...props
}: Omit<NumberFieldProps, "onChange">) => {
  const [value, setValue] = useState(valueProp);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <Container maxWidth="300px">
      <NumberFieldInput
        value={value}
        onChange={(inputValue: string) => {
          setValue(inputValue);
        }}
        {...props}
      />
    </Container>
  );
};

export default {
  component: NumberField,
  title: "Forms/Input/NumberField",
  tags: ["form-field", "input", "autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    readOnly: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
    hideControls: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};

export const Variations = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("42");
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
            <NumberFieldInput
              label="Empty"
              placeholder="Enter number"
              value={value1}
              onChange={setValue1}
              loading={false}
            />
            <NumberFieldInput
              label="Filled"
              placeholder="Enter number"
              value={value2}
              onChange={setValue2}
              loading={false}
            />
            <NumberFieldInput
              label="Disabled"
              placeholder="Enter number"
              disabled
              value={value2}
              onChange={setValue2}
              loading={false}
            />
            <NumberFieldInput
              label="With Error"
              placeholder="Enter number"
              error="This field is required"
              value={value1}
              onChange={setValue1}
              loading={false}
            />
            <NumberFieldInput
              label="Loading"
              placeholder="Enter number"
              value={value3}
              onChange={setValue3}
              loading={true}
            />
          </div>
        </section>

        <section>
          <h3>Control Visibility</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <NumberFieldInput
              label="With Controls (default)"
              placeholder="Enter number"
              value={value1}
              onChange={setValue1}
              loading={false}
            />
            <NumberFieldInput
              label="Without Controls"
              placeholder="Enter number"
              hideControls
              value={value1}
              onChange={setValue1}
              loading={false}
            />
          </div>
        </section>

        <section>
          <h3>Orientations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <NumberFieldInput
              label="Vertical (default)"
              placeholder="Enter number"
              orientation="vertical"
              value={value1}
              onChange={setValue1}
              loading={false}
            />
            <NumberFieldInput
              label="Horizontal"
              placeholder="Enter number"
              orientation="horizontal"
              value={value1}
              onChange={setValue1}
              loading={false}
            />
          </div>
        </section>

        <section>
          <h3>Label Position</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <NumberFieldInput
              label="Label Start"
              placeholder="Enter number"
              dir="start"
              value={value1}
              onChange={setValue1}
              loading={false}
            />
            <NumberFieldInput
              label="Label End"
              placeholder="Enter number"
              dir="end"
              value={value1}
              onChange={setValue1}
              loading={false}
            />
          </div>
        </section>

        <section>
          <h3>Read Only</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <NumberFieldInput
              label="Read Only"
              placeholder="Enter number"
              readOnly
              value={value2}
              onChange={setValue2}
              loading={false}
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
