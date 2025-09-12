import { BigStat } from "./BigStat";

export default {
  component: BigStat,
  title: "Display/Big Stat",
  tags: ["big-stat", "autodocs"],
  argTypes: {
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
    state: {
      options: ["default", "muted"],
      control: { type: "radio" },
    },
    error: {
      control: { type: "boolean" },
    },
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
    maxWidth: "300px",
    error: false,
  },
};
