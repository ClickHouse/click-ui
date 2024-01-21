import { Alert, AlertProps } from "@/components/Alert/Alert";
import { ICON_NAMES } from "@/components/Icon/types.ts";
import { Container } from "..";

const ExampleAlert = (props: AlertProps) => {
  return (
    <Container maxWidth="65%">
      <Alert
        title={props.title}
        text={props.text}
        state={props.state}
        type={props.type}
        showIcon={props.showIcon}
        customIcon={props.customIcon}
        dismissible={props.dismissible}
      />
    </Container>
  );
};

export default {
  component: ExampleAlert,
  title: "Display/Alert",
  tags: ["alert", "autodocs"],

  argTypes: {
    state: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
    type: { control: "radio", options: ["default", "banner"] },
    size: { control: "radio", options: ["medium", "small"] },
    customIcon: { control: "select", options: ICON_NAMES },
  },
};

export const Playground = {
  args: {
    title: "",
    text: "An alert example",
    state: "success",
    size: "small",
    type: "default",
    showIcon: true,
    dismissible: false,
  },
};
