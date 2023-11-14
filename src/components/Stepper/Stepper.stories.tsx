import Stepper from "./Stepper";
const StepperExample = props => {
  return (
    <Stepper
      activeIndex={1}
      {...props}
    >
      <Stepper.Step label="Label 1">Text Value 1</Stepper.Step>
      <Stepper.Step label="Label 2">Text Value 2</Stepper.Step>
      <Stepper.Step label="Label 3">Text Value 3</Stepper.Step>
    </Stepper>
  );
};
export default {
  component: StepperExample,
  title: "Display/Stepper",
  tags: ["spacer", "autodocs"],
  argTypes: {
    type: {
      options: ["numbered", "bulleted"],
      control: "inline-radio",
    },
  },
};

export const Playground = {
  args: {
    activeIndex: 0,
    type: "bulleted",
  },
};
