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
  title: "Forms/Checkbox",
  tags: ["checkbox", "autodocs"],
  argTypes: {
    checked: { control: "radio", options: ["default", "checked", "unchecked"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
    variant: {
      control: "radio",
      options: ["default", "var1", "var2", "var3", "var4", "var5", "var6"],
    },
  },
};

export const Playground = {
  args: {
    label: "Accept terms and conditions",
    disabled: false,
    checked: "default",
  },
};
