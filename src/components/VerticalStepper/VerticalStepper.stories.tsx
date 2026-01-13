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

export const Variations = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiStepTrigger",
      focus: ".cuiStepTrigger",
      active: ".cuiStepTrigger",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Numbered Type</h3>
        <VerticalStepper type="numbered">
          <VerticalStepper.Step
            label="Complete Step"
            collapsed={false}
            status="complete"
          >
            <Text>This step has been completed</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Active Step"
            status="active"
          >
            <Text>This is the current active step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Incomplete Step"
            status="incomplete"
          >
            <Text>This step is not yet started</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>Bulleted Type</h3>
        <VerticalStepper type="bulleted">
          <VerticalStepper.Step
            label="Complete Step"
            collapsed={false}
            status="complete"
          >
            <Text>This step has been completed</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Active Step"
            status="active"
          >
            <Text>This is the current active step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Incomplete Step"
            status="incomplete"
          >
            <Text>This step is not yet started</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>All Statuses (Numbered)</h3>
        <VerticalStepper type="numbered">
          <VerticalStepper.Step
            label="Complete Status"
            status="complete"
            collapsed={false}
          >
            <Text>Completed step content</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Active Status"
            status="active"
          >
            <Text>Active step content</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Incomplete Status"
            status="incomplete"
          >
            <Text>Incomplete step content</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>All Statuses (Bulleted)</h3>
        <VerticalStepper type="bulleted">
          <VerticalStepper.Step
            label="Complete Status"
            status="complete"
            collapsed={false}
          >
            <Text>Completed step content</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Active Status"
            status="active"
          >
            <Text>Active step content</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Incomplete Status"
            status="incomplete"
          >
            <Text>Incomplete step content</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>Collapsed vs Expanded</h3>
        <VerticalStepper type="numbered">
          <VerticalStepper.Step
            label="Collapsed Complete"
            status="complete"
            collapsed={true}
          >
            <Text>This content is hidden</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Expanded Complete"
            status="complete"
            collapsed={false}
          >
            <Text>This content is visible</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Active (Always Expanded)"
            status="active"
            collapsed={true}
          >
            <Text>Active steps are always expanded</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>Disabled Steps</h3>
        <VerticalStepper type="numbered">
          <VerticalStepper.Step
            label="Enabled Complete"
            status="complete"
            collapsed={false}
          >
            <Text>Normal complete step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Disabled Complete"
            status="complete"
            disabled
            collapsed={false}
          >
            <Text>Disabled complete step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Disabled Active"
            status="active"
            disabled
          >
            <Text>Disabled active step</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>Long Labels</h3>
        <VerticalStepper type="numbered">
          <VerticalStepper.Step
            label="This is a very long label that might wrap to multiple lines to test how the component handles longer text"
            status="complete"
            collapsed={false}
          >
            <Text>Content for step with long label</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Another long label that demonstrates text wrapping behavior in the stepper component"
            status="active"
          >
            <Text>Content for active step with long label</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>Rich Content</h3>
        <VerticalStepper type="numbered">
          <VerticalStepper.Step
            label="Step with Complex Content"
            status="complete"
            collapsed={false}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Text weight="semibold">Step Details</Text>
              <Text size="sm">This step includes multiple pieces of information.</Text>
              <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                <li>Item one</li>
                <li>Item two</li>
                <li>Item three</li>
              </ul>
            </div>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Current Step"
            status="active"
          >
            <div>
              <Text>Work in progress...</Text>
            </div>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>

      <section>
        <h3>Many Steps</h3>
        <VerticalStepper type="numbered">
          <VerticalStepper.Step
            label="Step 1"
            status="complete"
            collapsed={false}
          >
            <Text>First step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Step 2"
            status="complete"
          >
            <Text>Second step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Step 3"
            status="complete"
          >
            <Text>Third step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Step 4"
            status="active"
          >
            <Text>Current step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Step 5"
            status="incomplete"
          >
            <Text>Fifth step</Text>
          </VerticalStepper.Step>
          <VerticalStepper.Step
            label="Step 6"
            status="incomplete"
          >
            <Text>Sixth step</Text>
          </VerticalStepper.Step>
        </VerticalStepper>
      </section>
    </div>
  ),
};
