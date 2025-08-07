import { useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { ButtonGroup } from "./ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: "Buttons/ButtonGroup",
  tags: ["button-group", "autodocs"],
  render: ({ selected, ...props }) => {
    const [value, setValue] = useState(selected);

    return (
      <ButtonGroup
        {...props}
        selected={value}
        onClick={setValue}
      />
    );
  },
};

export default meta;

export const Playground: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    fillWidth: false,
    type: "default",
    selected: "option3",
  },
};
