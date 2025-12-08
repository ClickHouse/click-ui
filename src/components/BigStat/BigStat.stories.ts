import { Meta, StoryObj } from "@storybook/react-vite";
import { BigStat } from "./BigStat";

const meta: Meta<typeof BigStat> = {
  component: BigStat,
  title: "Display/Big Stat",
  tags: ["big-stat", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof BigStat>;

export const Playground: Story = {
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
