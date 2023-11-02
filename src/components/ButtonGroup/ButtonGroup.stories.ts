import { ButtonGroup } from "./ButtonGroup";

export default {
  component: ButtonGroup,
  title: "Buttons/ButtonGroup",
  tags: ["button-group", "autodocs"],
};

export const Playground = {
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    fillWidth: false,
  },
};
