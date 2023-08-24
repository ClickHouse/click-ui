import { Icon } from "@/components";
import { Select, SelectProps } from "./Select";
interface Props extends SelectProps {
  clickableNoData?: boolean;
}
const SelectExample = ({ clickableNoData, ...props }: Props) => {
  return (
    <Select {...props}>
      <Select.Group heading="Group label">
        <Select.Item value="content0">
          <Icon name="user" />
          Content0
        </Select.Item>
      </Select.Group>
      <Select.Item value="content1">Content1 long text content</Select.Item>
      <Select.Item value="content2">Content2</Select.Item>
      <Select.Item value="content3">Content3</Select.Item>
      {clickableNoData ? (
        <Select.NoData onClick={() => console.log("Asasas")}>
          {({ search }) => `No Field found ${search}`}
        </Select.NoData>
      ) : (
        <Select.NoData />
      )}
    </Select>
  );
};
export default {
  component: SelectExample,
  title: "Forms/Select",
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
  },
};
