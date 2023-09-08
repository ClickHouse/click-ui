import { ButtonGroup } from "./ButtonGroup";

export default {
  component: ButtonGroup,
  title: "Buttons/ButtonGroup",
  tags: ["button-group", "autodocs"],
};

export const Playground = {
  args: {
    labels: ["Button 1", "Button 2", "Button 3"],
    activeIndex: 2,
    disabled: [false, false, true],
  },
};
