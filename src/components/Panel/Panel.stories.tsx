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
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "inline-radio" },
    },
  },
};

export const Playground = {
  args: {
    color: "default",
    padding: "md",
    hasBorder: true,
    hasShadow: true,
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
