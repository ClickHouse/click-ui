import { Button } from "./Button";

export default {
  title: "Buttons/Button",
  component: Button,
  tags: ["button", "autodocs"],
  argTypes: {
    type: {
      options: ["primary", "secondary", "danger"],
      control: { type: "radio" },
    },
    align: {
      options: ["center", "left"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
    align: "center",
    fillWidth: false,
  },
};
