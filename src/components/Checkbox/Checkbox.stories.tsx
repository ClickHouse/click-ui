import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Forms/Checkbox",
  tags: ["checkbox", "autodocs"],
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

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};
