import { Icon } from "@/components";
import { MultiSelect, MultiSelectProps } from "./MultiSelect";
interface Props extends Omit<MultiSelectProps, "value"> {
  clickableNoData?: boolean;
  value: string;
  showSearch?: boolean;
}
const MultiSelectExample = ({ clickableNoData, value, showSearch, ...props }: Props) => {
  return (
    <MultiSelect
      value={value ? value.split(",") : undefined}
      onCreateOption={
        clickableNoData ? search => console.log("Clicked ", search) : undefined
      }
      {...props}
    >
      <MultiSelect.Trigger />
      <MultiSelect.Content showSearch={showSearch}>
        <MultiSelect.Group heading="Group label">
          <MultiSelect.Item value="content0">
            <Icon name="user" />
            Content0
          </MultiSelect.Item>
        </MultiSelect.Group>
        <div>
          <MultiSelect.Item value="content1">Content1 long text content</MultiSelect.Item>
        </div>
        <MultiSelect.Item value="content2">Content2</MultiSelect.Item>
        <MultiSelect.Item value="content3">Content3</MultiSelect.Item>
        <MultiSelect.NoData />
      </MultiSelect.Content>
    </MultiSelect>
  );
};
export default {
  component: MultiSelectExample,
  title: "Forms/MultiSelect",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    label: { control: "string" },
    disabled: { control: "boolean" },
    error: { control: "string" },
    value: { control: "string" },
    defaultValue: { control: "string" },
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    name: { control: "string" },
    required: { control: "boolean" },
    showSearch: { control: "boolean" },
    isFormControl: { control: "boolean" },
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
};
