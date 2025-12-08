import { Meta, StoryObj } from "@storybook/react-vite";
import { DateDetails } from "./DateDetails";

const meta: Meta<typeof DateDetails> = {
  component: DateDetails,
  title: "Display/DateDetails",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DateDetails>;

export const Playground: Story = {
  args: {
    date: new Date(),
    side: "top",
    size: "sm",
    weight: "normal",
  },
};
