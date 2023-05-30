import { ButtonGroup } from "./ButtonGroup";

export default {
  component: ButtonGroup,
  title: "ButtonGroup",
  tags: ["buttons"],
};

export const Default = {
  args: {
    labels: ["Button 1", "Button 2", "Button 3"],
    activeIndex: 2,
  },
};
