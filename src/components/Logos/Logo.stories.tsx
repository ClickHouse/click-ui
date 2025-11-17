import { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";
import LogosLight from "./LogosLight";

const meta: Meta<typeof Logo> = {
  component: Logo,
  title: "Display/Logo",
  tags: ["LOGO", "autodocs"],
  argTypes: {
    name: {
      options: Object.keys(LogosLight),
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Playground: Story = {
  args: {
    name: "aws",
    width: "",
    height: "",
    size: "xl",
  },
};
