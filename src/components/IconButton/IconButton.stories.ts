import { IconButton } from "./IconButton";

export default {
  component: IconButton,
  title: "Buttons/IconButton",
  tags: ["icon-button","autodocs"],
};

export const Playground = {
  args: {
    icon: "user",
  },
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
    size: "small",
    icon: "user",
  },
};
