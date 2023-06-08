import { Button } from "./Button";

export default {
  component: Button,
  title: "Button",
  tags: ["button"],
};

export const Default = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
  },
};

export const Hover = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Active = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};
