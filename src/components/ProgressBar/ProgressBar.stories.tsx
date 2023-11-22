import { ProgressBar } from "./ProgressBar";

export default {
  component: ProgressBar,
  title: "Display/ProgressBar",
  tags: ["progressBar", "autodocs"],
  argTypes: {
    type: {
      options: ["default", "small"],
      control: { type: "select" },
    },
    dismissable: {
      control: { type: "boolean" },
      if: { arg: "type", eq: "default" },
    },
    onCancel: {
      if: { arg: "dismissable", truthy: true },
    },
    successMessage: {
      control: { type: "text" },
      if: { arg: "type", eq: "default" },
    },
    label: { control: "text" },
    error: { control: "text" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
};

export const Playground = {
  args: {
    progress: 0,
    type: "default",
    dismissable: true,
    onCancel: () => console.log("onCancel clicked"),
    successMessage: "Progress completed",
  },
};
