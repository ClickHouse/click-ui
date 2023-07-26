import { Alert } from "@/components/Alert/Alert";

export default {
  component: Alert,
  title: "Display/Alert",
  tags: ["alert", "autodocs"],
};

export const Playground = {
  args: {
    state: "success",
    text: "An alert example",
  },
};
