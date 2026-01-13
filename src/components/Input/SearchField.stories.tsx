import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { Container } from "@/components/Container/Container";

import { SearchField } from "./SearchField";

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  title: "Forms/Input/SearchField",
  tags: ["form-field", "input", "autodocs"],
  render: ({ value: valueProp, ...props }) => {
    const [value, setValue] = useState(valueProp);

    useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    return (
      <Container maxWidth="350px">
        <SearchField
          {...props}
          value={value}
          onChange={setValue}
        />
      </Container>
    );
  },
};

export default meta;

export const Playground: StoryObj<typeof SearchField> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

export const Variations: StoryObj<typeof SearchField> = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("search query");
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
          <h3>Icon Types</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SearchField
              label="Search Icon"
              placeholder="Search..."
              value={value1}
              onChange={setValue1}
              isFilter={false}
            />
            <SearchField
              label="Filter Icon"
              placeholder="Filter..."
              value={value1}
              onChange={setValue1}
              isFilter={true}
            />
          </div>
        </section>

        <section>
          <h3>States</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SearchField
              label="Empty"
              placeholder="Search..."
              value={value1}
              onChange={setValue1}
            />
            <SearchField
              label="Filled"
              placeholder="Search..."
              value={value2}
              onChange={setValue2}
            />
            <SearchField
              label="Disabled"
              placeholder="Search..."
              disabled
              value={value2}
              onChange={setValue2}
            />
            <SearchField
              label="With Error"
              placeholder="Search..."
              error="Search query is invalid"
              value={value1}
              onChange={setValue1}
            />
            <SearchField
              label="Loading"
              placeholder="Search..."
              loading
              value={value3}
              onChange={setValue3}
            />
          </div>
        </section>

        <section>
          <h3>With Clear Button</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SearchField
              label="Clearable (default)"
              placeholder="Search..."
              value={value2}
              onChange={setValue2}
            />
            <SearchField
              label="Not Clearable"
              placeholder="Search..."
              clear={false}
              value={value2}
              onChange={setValue2}
            />
          </div>
        </section>

        <section>
          <h3>Orientations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SearchField
              label="Vertical (default)"
              placeholder="Search..."
              orientation="vertical"
              value={value1}
              onChange={setValue1}
            />
            <SearchField
              label="Horizontal"
              placeholder="Search..."
              orientation="horizontal"
              value={value1}
              onChange={setValue1}
            />
          </div>
        </section>

        <section>
          <h3>Label Position</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SearchField
              label="Label Start"
              placeholder="Search..."
              dir="start"
              value={value1}
              onChange={setValue1}
            />
            <SearchField
              label="Label End"
              placeholder="Search..."
              dir="end"
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
