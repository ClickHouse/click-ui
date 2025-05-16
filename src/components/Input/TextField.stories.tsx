import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

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

export const LabelColor: StoryObj<typeof TextField> = {
  args: {
    label: "Label",
    labelColor: "rgb(193, 0, 0)",
    type: "text",
    placeholder: "Placeholder",
  },
};
