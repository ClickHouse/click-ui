import { MultiAccordion } from "./MultiAccordion";

export default {
  component: MultiAccordion,
  title: "Display/MultiAccordion",
  tags: ["multi-accordion", "autodocs"],
  argTypes: {
    gap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    padding: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    fillWidth: { control: "boolean" },
    showBorder: { control: "boolean" },
    showCheck: { control: "boolean" },
    type: { control: "radio", options: ["single", "multiple"] },
    collapsible: { control: "boolean", if: { arg: "type", eq: "single" } },
  },
};

export const Playground = {
  args: {
    type: "single",
    collapsible: true,
    showBorder: true,
    showCheck: true,
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          icon="user"
          title="Option 1"
          isCompleted
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};
