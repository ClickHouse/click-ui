import { StoryFn } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

export default {
  component: ProgressBar,
  title: "Display/ProgressBar",
  tags: ["progressBar", "autodocs"],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: "400px", height: "200px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      options: ["default", "small"],
      control: { type: "select" },
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    dir: {
      options: ["start", "end"],
      control: { type: "radio" },
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
    progress: 60,
    type: "default",
    orientation: "horizontal",
    dir: "start",
    dismissable: true,
    onCancel: () => console.log("onCancel clicked"),
    successMessage: "Progress completed",
  },
};

export const SmallProgressBar = {
  args: {
    progress: 60,
    type: "small",
    orientation: "horizontal",
    dir: "start",
  },
};

export const VerticalProgressBar = {
  args: {
    progress: 75,
    type: "small",
    orientation: "vertical",
    dir: "start",
  },
};
