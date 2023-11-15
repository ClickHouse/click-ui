import VerticalStepper, { VerticalStepperProps } from "./VerticalStepper";
const StepperExample = (props: VerticalStepperProps) => {
  return (
    <VerticalStepper {...props}>
      <VerticalStepper.Step
        label="Label 1"
        collapsed={false}
        status="complete"
      >
        Text Value 1
      </VerticalStepper.Step>
      <VerticalStepper.Step
        label="Label 2"
        status="complete"
      >
        Text Value 2
      </VerticalStepper.Step>
      <VerticalStepper.Step
        label="Label 3"
        status="active"
      >
        Text Value 3
      </VerticalStepper.Step>
      <VerticalStepper.Step label="Label 4">Text Value 4</VerticalStepper.Step>
    </VerticalStepper>
  );
};
export default {
  component: StepperExample,
  title: "Display/VerticalStepper",
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
    type: "bulleted",
  },
};
