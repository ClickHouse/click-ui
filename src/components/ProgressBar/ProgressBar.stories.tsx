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
  },
};

export const DefaultProgressBar = {
  args: {
    progress: 100,
    type: "default",
    dismissable: true,
    onCancel: () => console.log("onCancel clicked"),
    successMessage: "Progress completed",
  },
};

export const SmallProgressBar = {
  args: {
    progress: 100,
    type: "small",
    successMessage: "Progress completed",
  },
};
