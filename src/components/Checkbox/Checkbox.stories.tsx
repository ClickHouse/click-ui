import { Checkbox } from "./Checkbox";

const CheckboxComponent = ({
  checked,
  ...props
}: {
  checked: "default" | "checked" | "unchecked";
  disabled: boolean;
  label?: string;
}) => {
  return (
    <Checkbox
      checked={checked === "default" ? undefined : checked === "checked"}
      {...props}
    />
  );
};
export default {
  component: CheckboxComponent,
  title: "Checkbox",
  tags: ["checkbox"],
  argTypes: {
    checked: { control: "radio", options: ["default", "checked", "unchecked"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};

export const Default = {
  args: {
    label: "Accept terms and conditions",
    disabled: false,
    checked: "default",
  },
};
