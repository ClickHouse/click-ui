import { IconButton } from "./IconButton";

export default {
  component: IconButton,
  title: "Buttons/IconButton",
  tags: ["icon-button", "autodocs"],
};

export const Playground = {
  args: {
    icon: "user",
    size: "default",
    disabled: false
  },
  argTypes: {
    size: { control: "radio", options: ["default", "sm", "xs"] },
    type: { control: "select", options: ["primary", "secondary", "ghost", "info", "danger"] },
  }
};

export const Disabled = {
  args: {
    disabled: true,
    icon: "user",
  },
};

export const Empty = {
  args: {
    display: "empty",
    icon: "user",
  },
};

export const Small = {
  args: {
    size: "sm",
    icon: "user",
  },
};
