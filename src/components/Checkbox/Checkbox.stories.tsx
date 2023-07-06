import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
  title: "Checkbox",
  tags: ["checkbox"],
};

export const Default = {
  args: {
    label: "Accept terms and conditions",
    isDisabled: false,
    isChecked: false,
  },
};

export const Hover = {
  args: {
    label: "Accept terms and conditions",
    isDisabled: false,
    isChecked: false,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Checked = {
  args: {
    label: "Accept terms and conditions",
    isDisabled: false,
    isChecked: true,
  },
};

export const DisabledDefault = {
  args: {
    label: "Accept terms and conditions",
    isDisabled: true,
    isChecked: false,
  },
};

export const DisabledHover = {
  args: {
    label: "Accept terms and conditions",
    isDisabled: true,
    isChecked: false,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const DisabledChecked = {
  args: {
    label: "Accept terms and conditions",
    isDisabled: true,
    isChecked: true,
  },
};
