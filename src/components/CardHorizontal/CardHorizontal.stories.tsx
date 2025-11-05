import { Meta, StoryObj } from "@storybook/react-vite";
import { styled } from "styled-components";

import { ICON_NAMES } from "../Icon/types";

import { CardHorizontal } from "./CardHorizontal";

const GridCenter = styled.div`
  display: grid;
  width: 60%;
`;

const meta: Meta<typeof CardHorizontal> = {
  component: CardHorizontal,
  title: "Cards/Horizontal Card",
  tags: ["cardHorizontal", "autodocs"],
  argTypes: {
    icon: { type: { name: "enum", value: [...ICON_NAMES] } },
    badgeIcon: { type: { name: "enum", value: [...ICON_NAMES] } },
    badgeState: {
      type: {
        name: "enum",
        // FIXME should refer to the Badge constants
        value: ["default", "success", "neutral", "danger", "disabled", "warning", "info"],
      },
    },
    // FIXME should refer to a constant
    badgeIconDir: { type: { name: "enum", value: ["start", "end"] } },
  },
  decorators: Story => (
    <GridCenter>
      <Story />
    </GridCenter>
  ),
};

export default meta;

export const Playground: StoryObj<typeof CardHorizontal> = {
  args: {
    icon: "building",
    title: "Card title",
    description: "A description very interesting that presumably relates to the card.",
    disabled: false,
    isSelected: false,
    badgeText: "",
    badgeIcon: undefined,
    badgeState: "default",
    badgeIconDir: undefined,
    infoText: "",
    infoUrl: "",
    size: "md",
  },
};
