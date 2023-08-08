import { CardSecondary } from "./CardSecondary";

export default {
  component: CardSecondary,
  title: "Cards/Secondary Card",
  tags: ["cardSecondary", "autodocs"],
  argTypes: {
    badgeState: {
      options: ["default", "success", "neutral", "info", "warning", "danger", "disabled"],
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    title: "Card title",
    icon: "building",
    description: "A description very interesting that presumably relates to the card",
    infoUrl: "https://clickhouse.com",
    infoText: "Read More",
    hasShadow: false,
    disabled: false,
    badgeText: "experiment",
    badgeState: "success",
  },
};
