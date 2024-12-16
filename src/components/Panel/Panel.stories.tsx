import { Panel } from "./Panel";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";

export default {
  component: Panel,
  title: "Display/Panel",
  tags: ["panel", "autodocs"],
  argTypes: {
    cursor: {
      control: "select",
      options: [
        "auto",
        "default",
        "none",
        "context-menu",
        "help",
        "pointer",
        "progress",
        "wait",
        "cell",
        "crosshair",
        "text",
        "vertical-text",
        "alias",
        "copy",
        "move",
        "no-drop",
        "not-allowed",
        "grab",
        "grabbing",
        "e-resize",
        "n-resize",
        "ne-resize",
        "nw-resize",
        "s-resize",
        "se-resize",
        "sw-resize",
        "w-resize",
        "ew-resize",
        "ns-resize",
        "nesw-resize",
        "nwse-resize",
        "col-resize",
        "row-resize",
        "all-scroll",
        "zoom-in",
        "zoom-out",
      ],
    },
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
