import { CardHorizontal } from "./CardHorizontal";

export default {
  component: CardHorizontal,
  title: "Cards/Horizontal Card",
  tags: ["cardHorizontal", "autodocs"],
};

export const Playground = {
  args: {
    icon: "building",
    title: "Card title",
    description: "A description very interesting that presumably relates to the card.",
    disabled: false,
    isSelected: false,
    badgeText: null,
    badgeIcon: null,
  },
};
