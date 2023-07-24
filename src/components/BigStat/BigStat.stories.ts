import { BigStat } from "./BigStat";

export default {
  component: BigStat,
  title: "Big Stat",
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["lg", "sm"],
      control: { type: "radio" },
    },
  }
};

export const Playground = {
  args: {
    label: "Percentage complete",
    title: "100%",
    state: "default",
    size: "lg"
  },
};
