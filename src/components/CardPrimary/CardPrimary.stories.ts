import { CardPrimary } from "./CardPrimary";

export default {
  component: CardPrimary,
  title: "Cards/Primary Card",
  tags: ["cardPrimary", "autodocs"],
};

export const Playground = {
  args: {
    icon: "building",
    title: "Card title",
    description: "A description very interesting that presumably relates to the card.",
    infoUrl: "https://clickhouse.com",
    infoText: "Read More",
    hasShadow: false,
    disabled: false,
    isSelected: true,
    size: "md",
    alignContent: "center",
    topBadgeText: "Top badge",
  },
};
