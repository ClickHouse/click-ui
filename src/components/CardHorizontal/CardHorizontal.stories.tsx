import { CardHorizontal } from "./CardHorizontal";
import { ICON_NAMES } from "@/components/Icon/types.ts";
import { styled } from "styled-components";
import { Meta, StoryObj } from "@storybook/react-vite";

const GridCenter = styled.div`
  display: grid;
  width: 60%;
`;

const CardHorizontalExample = ({ ...props }) => {
  return (
    <GridCenter>
      <CardHorizontal
        title={props.title}
        icon={props.icon}
        description={props.description}
        disabled={props.disabled}
        isSelected={props.isSelected}
        badgeText={props.badgeText}
        badgeIcon={props.badgeIcon}
        badgeState={props.badgeState}
        badgeIconDir={props.badgeIconDir}
        infoText={props.infoText}
        infoUrl={props.infoUrl}
        size={props.size}
        {...props}
      />
    </GridCenter>
  );
};

const meta: Meta<typeof CardHorizontal> = {
  component: CardHorizontalExample,
  title: "Cards/Horizontal Card",
  tags: ["cardHorizontal", "autodocs"],
};

export default meta;

export const Playground = {
  args: {
    icon: "building",
    title: "Card title",
    description: "A description very interesting that presumably relates to the card.",
    disabled: false,
    isSelected: false,
    badgeText: "",
    badgeIcon: null,
    badgeState: "default",
    badgeIconDir: "",
    infoText: "",
    infoUrl: "",
    size: "md",
  },
};
