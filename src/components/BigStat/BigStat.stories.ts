import { BigStat } from "./BigStat";

export default {
  component: BigStat,
  title: "Display/Big Stat",
  tags: ["big-stat", "autodocs"],
  order: {
    options: ["titleTop", "titleBottom"],
    control: { type: "radio" },
  },
  size: {
    options: ["lg", "sm"],
    control: { type: "radio" },
  },
  spacing: {
    options: ["lg", "sm"],
    control: { type: "radio" },
  },
};

export const Playground = {
  args: {
    label: "Percentage complete",
    title: "100%",
    state: "default",
    size: "lg",
    spacing: "sm",
    order: "titleTop",
    height: "",
    fillWidth: false,
    maxWidth: "none"
  },
};
