import { ButtonGroup } from "./ButtonGroup";

export default {
  component: ButtonGroup,
  title: "Buttons/ButtonGroup",
  tags: ["button-group", "autodocs"],
  type: {
    options: ["default", "borderless"],
    control: { type: "radio" },
  },
  selected:{ 
    options: ["option1","option2","option3"],
    control: { type: "select" },
  },
  disabled:{ 
    options: ["option1","option2","option3"],
    control: { type: "select" },
  },
};

export const Playground = {
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    fillWidth: false,
    type: "default",
    selected: "option3",
  },
};
