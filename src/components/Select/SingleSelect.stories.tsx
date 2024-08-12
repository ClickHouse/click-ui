import { Preview } from "@storybook/react";
import { Select, SelectProps } from "@/components/Select/SingleSelect";
import { selectOptions } from "@/components/Select/selectOptions";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container/Container";
import { Panel } from "@/components/Panel/Panel";
import { Title } from "@/components/Typography/Title/Title";
interface Props extends SelectProps {
  childrenType: "children" | "options";
}
const SelectExample = ({ childrenType, value, ...props }: Props) => {
  const [selectedValue, setSelectedValue] = useState(value);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  if (childrenType === "options") {
    return (
      <Select
        value={selectedValue}
        onSelect={value => setSelectedValue(value)}
        options={selectOptions}
        {...props}
      />
    );
  }
  return (
    <Select {...props}>
      <Select.Group heading="Group label">
        <Select.Item
          value="content0"
          icon="user"
        >
          Content0
        </Select.Item>
      </Select.Group>
      <div>
        <Select.Item value="content1">Content1 long text content</Select.Item>
      </div>
      <Select.Item
        value="content2"
        disabled
      >
        Content2
      </Select.Item>
      <Select.Item value="content3">Content3</Select.Item>
      <Select.Item
        value="content4"
        label="Content4"
      />
    </Select>
  );
};

export default {
  component: SelectExample,
  title: "Forms/Select",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    name: { control: "text" },
    required: { control: "boolean" },
    showSearch: { control: "boolean" },
    form: { control: "text" },
    allowCreateOption: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
    childrenType: { control: "inline-radio", options: ["children", "options"] },
  },
};

export const Playground: Preview = {
  args: {
    label: "Label",
    childrenType: "children",
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { allowCreateOption, childrenType, value, ...props } = story.args;
          return `<Select\n  value={${value}}\n${
            allowCreateOption ? "  allowCreateOption\n" : ""
          }${Object.entries(props)
            .flatMap(([key, value]) =>
              typeof value === "boolean"
                ? value
                  ? `  ${key}`
                  : []
                : `  ${key}=${typeof value == "string" ? `"${value}"` : `{${value}}`}`
            )
            .join("\n")}
${
  childrenType === "options"
    ? `options={${JSON.stringify(selectOptions, null, 2)}}\n/`
    : ""
}>
${
  childrenType !== "options"
    ? `
    <Select.Group heading="Group label">
      <Select.Item value="content0" icon="user>
        Content0
      </Select.Item>
    </Select.Group>
    <div>
      <Select.Item value="content1">Content1 long text content</Select.Item>
    </div>
    <Select.Item
      value="content2"
      disabled
    >
      Content2
    </Select.Item>
    <Select.Item value="content3">Content3</Select.Item>
</Select>
`
    : ""
}`;
        },
      },
    },
  },
};

export const UseFullWidth = {
  args: {},
  render: () => {
    return (
      <Container fillWidth>
        <Panel width="200px">
          <Title type="h2">Full width items</Title>
          <Select useFullWidthItems>
            <Select.Item value="item 1">
              Ask and it will be given to you; seek and you will find; knock and the door
              will be opened to you.
            </Select.Item>
            <Select.Item value="item 2">
              For everyone who asks receives; the one who seeks finds; and to the one who
              knocks, the door will be opened.
            </Select.Item>
            <Select.Item value="item 3">
              Which of you, if your son asks for bread, will give him a stone?
            </Select.Item>
          </Select>

          <Title type="h2">Not full width items</Title>
          <Select>
            <Select.Item value="item 1">
              Ask and it will be given to you; seek and you will find; knock and the door
              will be opened to you.
            </Select.Item>
            <Select.Item value="item 2">
              For everyone who asks receives; the one who seeks finds; and to the one who
              knocks, the door will be opened.
            </Select.Item>
            <Select.Item value="item 3">
              Which of you, if your son asks for bread, will give him a stone?
            </Select.Item>
          </Select>
        </Panel>
      </Container>
    );
  },
  tags: ["autodocs"],
};
