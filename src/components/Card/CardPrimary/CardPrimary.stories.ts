import { CardPrimary } from "./CardPrimary";

export default {
  component: CardPrimary,
  title: "Display/Cards/Primary Card",
  tags: ["cardPrimary","autodocs"],
  argTypes: {
    badgeState: {
      options: ["default","success","neutral", "info", "warning", "danger", "disabled"],
      control: { type: "select" },
    },
  }
};

export const Playground = {
  args: {
    title: "Card title",
    image: "building",
    description:
      "A description very interesting that presumably relates to the card",
    infoUrl: "https://clickhouse.com",
    infoText: "Read More",
    state: "default",
    hasShadow: false,
    hasBadge: true,
    badgeText: "experiment",
    badgeState: "success",
  },
};
