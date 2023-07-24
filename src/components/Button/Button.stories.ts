import { Button } from "./Button";

export default {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
  },
};

export const Secondary = {
  args: {
    type: "secondary",
    disabled: false,
    label: "Button",
  },
};
