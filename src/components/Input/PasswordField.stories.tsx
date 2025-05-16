import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

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
