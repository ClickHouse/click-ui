import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { Preview } from "@storybook/react-vite";
import { selectOptions } from "../Select/selectOptions";
import { useEffect, useState } from "react";
interface Props extends Omit<AutoCompleteProps, "options" | "children"> {
  childrenType: "children" | "options";
}
const SelectExample = ({ childrenType, value, ...props }: Props) => {
  const [selectedValue, setSelectedValue] = useState(value);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  if (childrenType === "options") {
    return (
      <AutoComplete
        value={selectedValue}
        onSelect={setSelectedValue}
        options={selectOptions}
        {...props}
      />
    );
  }
  return (
    <AutoComplete
      onSelect={setSelectedValue}
      {...props}
    >
      <AutoComplete.Group heading="Group label">
        <AutoComplete.Item
          value="content0"
          icon="user"
        >
          Content0
        </AutoComplete.Item>
      </AutoComplete.Group>
      <div>
        <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
      </div>
      <AutoComplete.Item
        value="content2"
        disabled
      >
        Content2
      </AutoComplete.Item>
      <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
      <AutoComplete.Item
        value="content4"
        label="Content4"
      />
    </AutoComplete>
  );
};

export default {
  component: SelectExample,
  title: "Display/AutoComplete",
  tags: ["form-field", "autocomplete", "autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    value: { control: "text" },
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
          const { childrenType, value, ...props } = story.args;
          return `<AutoComplete\n  value={${value}}\n${Object.entries(props)
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
    <AutoComplete.Group heading="Group label">
      <AutoComplete.Item value="content0" icon="user>
        Content0
      </AutoComplete.Item>
    </AutoComplete.Group>
    <div>
      <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
    </div>
    <AutoComplete.Item
      value="content2"
      disabled
    >
      Content2
    </AutoComplete.Item>
    <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
</AutoComplete>
`
    : ""
}`;
        },
      },
    },
  },
};
