import { ButtonGroup } from "./ButtonGroup";

export default {
  component: ButtonGroup,
  title: "Buttons/ButtonGroup",
  tags: ["button-group", "autodocs"],
  argTypes: {
    labels: { control: "array", options: ["default", "checked", "unchecked"] },
    activeIndex: { control: "number" },
  }
};

export const Playground = {
  args: {
    labels: ["Button 1", "Button 2", "Button 3"],
    activeIndex: 2,
  },
};
