import Button from "./Button";

export default {
  component: Button,
  title: "Button",
  tags: ["button"],
};

export const Default = {
  args: {
    type: "primary",
    disabled: true,
    children: "Button",
  },
};
