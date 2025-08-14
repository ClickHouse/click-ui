import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Forms/Checkbox",
  tags: ["checkbox", "autodocs"],
  argTypes: {
    checked: { control: "radio", options: [true, false, "indeterminate"] },
    defaultChecked: { control: "radio", options: [true, false, "indeterminate"] },
  },
  render: ({ checked, ...props }) => {
    const [checkedState, setCheckedState] = useState(checked);

    useEffect(() => {
      setCheckedState(checked);
    }, [checked]);

    return (
      <Checkbox
        {...props}
        checked={checkedState}
        onCheckedChange={setCheckedState}
      />
    );
  },
};

export default meta;

export const Playground: StoryObj<typeof Checkbox> = {
  args: {
    label: "Accept terms and conditions",
  },
};
