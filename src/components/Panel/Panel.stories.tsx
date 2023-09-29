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
  },
};

export const Playground = {
  args: {
    orientation: "vertical",
    color: "default",
    padding: "md",
    hasBorder: true,
    hasShadow: true,
    fillWidth: false,
    height: "",
    fillHeight: false,
    width: "50%",
    children: (
      <div>
        <Title type="h3">Example panel title</Title>
        <Text
          size="md"
          color="default"
        >
          Panel content
        </Text>
      </div>
    ),
  },
};
