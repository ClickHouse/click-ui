import { BigStat } from "./BigStat";

export default {
  component: BigStat,
  title: "Display/Big Stat",
  tags: ["big-stat", "autodocs"],
  size: {
    options: ["lg", "sm"],
    control: { type: "radio" },
  },
};

export const Playground = {
  args: {
    label: "Percentage complete",
    title: "100%",
    state: "default",
    size: "lg"
  },
};
