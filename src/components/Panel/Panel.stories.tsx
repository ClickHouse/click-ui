import { Panel } from "./Panel";

export default {
  component: Panel,
  title: "Display/Panel",
  tags: ["panel","autodocs"],
};

export const Playground = {
  args: {
    color: "default",
		padding: "md",
		hasBorder: true,
		hasShadow: true,
		children: "Panel content",
  },
};
