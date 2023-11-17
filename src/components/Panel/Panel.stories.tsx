import { Panel } from "./Panel";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";

export default {
  component: Panel,
  title: "Display/Panel",
  tags: ["panel", "autodocs"],
  argTypes: {
    padding: {
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    radii: {
      options: ["none", "sm", "md", "lg"],
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    orientation: "vertical",
    color: "default",
    padding: "md",
    hasBorder: true,
    radii: "sm",
    hasShadow: true,
    fillWidth: false,
    height: "",
    fillHeight: false,
    width: "50%",
    alignItems: "start",
    children: (
      <>
        <Title type="h3">Example panel title</Title>
        <Text
          size="md"
          color="default"
        >
          Panel content
        </Text>
      </>
    ),
  },
};
