import { Meta, StoryObj } from "@storybook/react-vite";
import { CardPromotion } from "./CardPromotion";

const meta: Meta<typeof CardPromotion> = {
  component: CardPromotion,
  title: "Cards/Promotion Card",
  tags: ["cardPromotion", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof CardPromotion>;

export const Playground: Story = {
  args: {
    icon: "star",
    label: "Join us at AWS re:Invent in Las Vegas from Nov 27 - Dec 1",
    dismissible: false,
  },
};
