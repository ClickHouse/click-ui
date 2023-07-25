import { Card } from "./Card";

export default {
  component: Card,
  title: "Display/Card",
  tags: ["card","autodocs"],
};

export const Playground = {
  args: {
    title: "Card title",
    badgeText: "experiment",
    description:
      "A description very interesting that presumably relates to the card",
    infoUrl: "#",
    infoText: "Read More",
    state: "active",
  },
};
