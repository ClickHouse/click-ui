import { Alert } from "@/components/Alert/Alert";

export default {
  component: Alert,
  title: "Alert",
  tags: ["alert"],
};

export const Neutral = {
  args: {
    state: "neutral",
    text: "An alert example",
  },
};

export const Title = {
  args: {
    state: "neutral",
    text: "An alert example",
    title: "Title",
  },
};

export const Icon = {
  args: {
    state: "neutral",
    text: "An alert example",
    title: "Title",
    showIcon: true,
  },
};

export const Danger = {
  args: {
    state: "danger",
    text: "An alert example",
    title: "Title",
    showIcon: true,
    dismissable: true,
    style: { width: "200px" },
  },
};

export const Warning = {
  args: {
    state: "warning",
    text: "An alert example",
    title: "Title",
    showIcon: true,
  },
};

export const Success = {
  args: {
    state: "success",
    text: "An alert example",
    title: "Title",
    showIcon: true,
  },
};

export const Info = {
  args: {
    state: "info",
    text: "An alert example",
    title: "Title",
    showIcon: true,
  },
};
