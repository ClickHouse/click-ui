import { Icon } from "@/components";
import { MultiSelect, SelectProps } from "./MultiSelect";
interface Props extends SelectProps {
  clickableNoData?: boolean;
}
const MultiSelectExample = ({ clickableNoData, value, ...props }: Props) => {
  return (
    <MultiSelect
      value={value}
      {...props}
    >
      <MultiSelect.Trigger />
      <MultiSelect.Content>
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
        {clickableNoData ? (
          <MultiSelect.NoData onCreateOption={search => console.log("Clicked ", search)}>
            {"No Field found {search}"}
          </MultiSelect.NoData>
        ) : (
          <MultiSelect.NoData />
        )}
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
    isFormCotrol: { control: "boolean" },
    clickableNoData: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    label: "Label",
    value: "content1",
  },
};
