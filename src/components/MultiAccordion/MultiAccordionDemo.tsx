import { ReactElement } from "react";
import { MultiAccordion } from "./MultiAccordion";

const MultiAccordionDemo = (): ReactElement => {
  return (
    <MultiAccordion
      type="single"
      showBorder
      showCheck
      fillWidth
      padding="md"
      markAsCompleted={value => console.log("Accordion status icon clicked", value)}
      collapsible
      title="test"
    >
      <MultiAccordion.Item
        title="Option 1"
        value="option-1"
        isCompleted
      >
        Option 1
      </MultiAccordion.Item>
      <MultiAccordion.Item
        title="Option 2"
        value="option-2"
        gap="xs"
      >
        Option 2
      </MultiAccordion.Item>
    </MultiAccordion>
  );
};

export default MultiAccordionDemo;
