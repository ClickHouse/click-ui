import { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./Panel";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";

const meta: Meta<typeof Panel> = {
  component: Panel,
  title: "Display/Panel",
  tags: ["panel", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Panel>;

export const Playground: Story = {
  args: {
    alignItems: "start",
    color: "default",
    cursor: "auto",
    fillHeight: false,
    fillWidth: false,
    hasBorder: true,
    hasShadow: true,
    height: "",
    orientation: "vertical",
    padding: "md",
    radii: "sm",
    width: "50%",
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
