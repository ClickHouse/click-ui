import { Switch } from "./Switch";

export default {
  component: Switch,
  title: "Forms/Switch",
  tags: ["switch", "autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
};

export const Playground = {
  args: {
    checked: true,
    disabled: false,
    label: "Switch label",
  },
};
