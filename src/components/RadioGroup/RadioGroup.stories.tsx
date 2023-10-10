import { RadioGroup, RadioGroupProps } from "./RadioGroup";

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
  title: "Forms/RadioGroup",
  tags: ["radio", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    inline: { control: "boolean" },
    dir: { control: "inline-radio", options: ["ltr", "rtl"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    loop: { control: "inline-radio", options: [undefined, true, false] },
    value: {
      control: "select",
      options: [undefined, "RadioButton1", "RadioButton2", "RadioButton3"],
    },
  },
};

export const Playground = {
  args: {
    disabled: false,
  },
};
