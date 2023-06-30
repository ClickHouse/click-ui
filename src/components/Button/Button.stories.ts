import { Button } from "./Button";

export default {
  component: Button,
  title: "Button",
  tags: ["button"],
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

export const IconLeft = {
  args: {
    type: "primary",
    label: "Button",
    iconLeft: "user",
  },
};

export const IconRight = {
  args: {
    type: "primary",
    label: "Button",
    iconRight: "user",
  },
};
export const IconLeftRight = {
  args: {
    type: "primary",
    label: "Button",
    iconRight: "user",
    iconLeft: "database",
  },
};
export const AlignLeft = {
  args: {
    type: "secondary",
    label: "Button",
    iconLeft: "database",
    align: "left",
    width: "270px",
  },
};
