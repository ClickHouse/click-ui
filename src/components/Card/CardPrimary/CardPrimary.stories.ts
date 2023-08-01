import { CardPrimary } from "./CardPrimary";

export default {
  component: CardPrimary,
  title: "Display/Cards/Primary Card",
  tags: ["cardPrimary","autodocs"],
};

export const Playground = {
  args: {
    image: "building",
    title: "Card title",
    description:
      "A description very interesting that presumably relates to the card.",
    infoUrl: "https://clickhouse.com",
    infoText: "Read More",
    hasShadow: false,
    disabled: false,
    size: "md",
  },
};
