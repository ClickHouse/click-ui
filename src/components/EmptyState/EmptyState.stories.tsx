import { EmptyState } from "./EmptyState";

export default {
  component: EmptyState,
  title: "Display/EmptyState",
  tags: ["emptyState", "autodocs"],
};

export const Playground = {
  args: {
    icon: "keys",
    title: "Create your first API Key",
    description:
      "Manage your ClickHouse Cloud service using APIs. Includes services, users, network access and scaling information.",
    primaryActionLabel: "Create API Key",
    primaryAction: () => {
      if (typeof window !== "undefined") {
        window.open("https://clickhouse.com", "_blank");
      }
    },
    primaryActionIcon: "plus",
    secondaryActionLabel: "Chat with us",
    secondaryAction: () => {
      if (typeof window !== "undefined") {
        window.open("https://clickhouse.com", "_blank");
      }
    },
    secondaryActionIcon: "chat",
  },
};
