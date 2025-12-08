import { Text } from "@/components";
import VerticalStepper, { VerticalStepperProps } from "./VerticalStepper";
const StepperExample = (props: VerticalStepperProps) => {
  return (
    <VerticalStepper {...props}>
      <VerticalStepper.Step
        label="Label 1"
        collapsed={false}
        status="complete"
      >
        <Text>Text Value 1</Text>
      </VerticalStepper.Step>
      <VerticalStepper.Step
        label="Label 2"
        status="complete"
      >
        <Text>Text Value 2</Text>
      </VerticalStepper.Step>
      <VerticalStepper.Step
        label="Label 3"
        status="active"
      >
        <Text>Text Value 3</Text>
      </VerticalStepper.Step>
      <VerticalStepper.Step label="Label 4">
        <Text>Text Value 4</Text>
      </VerticalStepper.Step>
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
