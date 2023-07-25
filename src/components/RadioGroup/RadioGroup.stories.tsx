import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { RadioGroup } from "./RadioGroup";

const RadioGroupComponent = (props: RadioGroupProps) => {
  return (
    <RadioGroup {...props}>
      <RadioGroup.Item
        label="Radio Button1"
        value="RadioButton1"
      />
      <RadioGroup.Item
        label="Radio Button2"
        value="RadioButton2"
      />
      <RadioGroup.Item
        label="Radio Button3"
        value="RadioButton3"
      />
    </RadioGroup>
  );
};
export default {
  component: RadioGroupComponent,
  title: "RadioGroup",
  tags: ["radio"],
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    dir: { control: "inline-radio", options: ["ltr", "rtl"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    loop: { control: "inline-radio", options: [undefined, true, false] },
    value: {
      control: "select",
      options: [undefined, "RadioButton1", "RadioButton2", "RadioButton3"],
    },
  },
};

export const Default = {
  args: {
    label: "Accept terms and conditions",
    disabled: false,
  },
};
