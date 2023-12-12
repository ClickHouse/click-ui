import { Alert } from "@/components/Alert/Alert";
import {ICON_NAMES} from "@/components/Icon/types.ts";

export default {
  component: Alert,
  title: "Display/Alert",
  tags: ["alert", "autodocs"],
};

export const Playground = {
  args: {
    title: "",
    text: "An alert example",
    state: "success",
    size: "small",
    type: "default",
    showIcon: true,
    dismissible: false
  },
  argTypes: {
    state: { control: "select", options: ["neutral", "info", "success", "warning", "danger"] },
    type: { control: "radio", options: ["default", "banner"] },
    size: { control: "radio", options: ["medium", "small"] },
    customIcon: {control: "select", options: ICON_NAMES}
  }

};
