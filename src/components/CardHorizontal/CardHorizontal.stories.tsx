import { CardHorizontal } from "./CardHorizontal";
import { styled } from "styled-components";
import { Meta, StoryObj } from "@storybook/react-vite";

const GridCenter = styled.div`
  display: grid;
  width: 60%;
`;

const meta: Meta<typeof CardHorizontal> = {
  component: CardHorizontal,
  title: "Cards/Horizontal Card",
  tags: ["cardHorizontal", "autodocs"],
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
