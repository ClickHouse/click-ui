import { BigStat } from "./BigStat";

export default {
  component: BigStat,
  title: "Display/Big Stat",
  tags: ["big-stat", "autodocs"],
  parameters: {
    docs: {
      story: {
        inline: true,
        iframeHeight: 150,
      },
    },
  },
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
