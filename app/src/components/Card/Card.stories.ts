import { Card } from "./card";

export default {
  component: Card,
  title: "Card",
  tags: ["card"],
};

export const Default = {
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
