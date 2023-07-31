import { Button } from "./Button";

export default {
  title: "Buttons/Button",
  component: Button,
  tags: ["button","autodocs"],
  argTypes: {
    type: {
      options: ["primary","secondary","danger"],
      control: { type: "radio" },
    },
    align: {
      options: ["default","left"],
      control: { type: "radio" },
    },
  }
};

export const Playground = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
    align: "default",
  },
};