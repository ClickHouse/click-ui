import { Icon } from "./Icon";
import { ICONS_MAP } from "./IconCommon";

export default {
  component: Icon,
  title: "Display/Icon",
  tags: ["icon", "autodocs"],
  argTypes: {
    name: {
      options: Object.keys(ICONS_MAP),
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    name: "users",
    width: "1rem",
    height: "16px",
  },
};
