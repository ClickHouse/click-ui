import { Icon } from "@/components";
import { MultiSelect, MultiSelectProps } from "./MultiSelect";
interface Props extends Omit<MultiSelectProps, "value"> {
  clickableNoData?: boolean;
  value: string;
}
const MultiSelectExample = ({ clickableNoData, value, ...props }: Props) => {
  return (
    <MultiSelect
      value={value ? value.split(",") : undefined}
      onCreateOption={
        clickableNoData ? search => console.log("Clicked ", search) : undefined
      }
      {...props}
    >
      <MultiSelect.Group heading="Group label">
        <MultiSelect.Item value="content0">
          <Icon name="user" />
          Content0
        </MultiSelect.Item>
      </MultiSelect.Group>
      <div>
        <MultiSelect.Item value="content1">Content1 long text content</MultiSelect.Item>
      </div>
      <MultiSelect.Item
        value="content2"
        label="Content2"
      />
      <MultiSelect.Item value="content3">Content3</MultiSelect.Item>
    </MultiSelect>
  );
};
export default {
  component: MultiSelectExample,
  title: "Forms/MultiSelect",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    name: { control: "text" },
    required: { control: "boolean" },
    showSearch: { control: "boolean" },
    form: { control: "text" },
    clickableNoData: { control: "boolean" },
    showCheck: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
};

export const Playground = {
  args: {
    label: "Label",
    value: "content1",
    showSearch: true,
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { clickableNoData, showSearch, value, ...props } = story.args;
          return `<MultiSelect\n  value={${JSON.stringify((value ?? "").split(","))}}\n${
            clickableNoData
              ? "  onCreateOption={search => console.log('Clicked ', search)}\n"
              : ""
          }${Object.entries(props)
            .map(
              ([key, value]) =>
                `  ${key}=${typeof value == "string" ? `"${value}"` : `{${value}}`}`
            )
            .join("\n")}
>
  <MultiSelect.Trigger />
  <MultiSelect.Content ${showSearch ? "showSearch" : ""}>
    <MultiSelect.Group heading="Group label">
      <MultiSelect.Item value="content0">
        <Icon name="user" />
        Content0
      </MultiSelect.Item>
    </MultiSelect.Group>
    <div>
      <MultiSelect.Item value="content1">Content1 long text content</MultiSelect.Item>
    </div>
    <MultiSelect.Item
      value="content2"
      disabled
    >
      Content2
    </MultiSelect.Item>
    <MultiSelect.Item value="content3">Content3</MultiSelect.Item>
    <MultiSelect.NoData />
  </MultiSelect.Content>
</MultiSelect>`;
        },
      },
    },
  },
};
