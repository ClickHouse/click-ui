import styled from "styled-components";
import { CUIFlexContainer, FlexProps } from "./FlexContainer";

const ColoredDiv = styled(CUIFlexContainer)`
  width: 100px;
  height: 100px;
  background: ${({ theme }) => theme.click.badge.color.background.info};
`;
const FlexContainerExample = ({
  flexGrow,
  flexShrink,
  flexBasis,
  ...props
}: FlexProps) => {
  return (
    <CUIFlexContainer {...props}>
      <ColoredDiv
        alignItems="center"
        justifyContent="center"
      >
        1
      </ColoredDiv>
      <ColoredDiv
        alignItems="center"
        justifyContent="center"
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        flexBasis={flexBasis}
      >
        2
      </ColoredDiv>
      <ColoredDiv
        alignItems="center"
        justifyContent="center"
      >
        3
      </ColoredDiv>
    </CUIFlexContainer>
  );
};

export default {
  component: FlexContainerExample,
  title: "Container/Flex",
  tags: ["container", "flex", "autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
    },
    wrap: { control: "select", options: ["wrap", "nowrap", "wrap-reverse"] },
    inline: { control: "boolean" },
    alignItems: {
      control: "select",
      options: [
        "normal",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "stretch",
        "start",
        "end",
        "self-start",
        "self-end",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "safe right",
        "unsafe right",
        "safe end",
        "unsafe end",
        "safe self-end",
        "unsafe self-end",
        "safe flex-end",
        "unsafe flex-end",
      ],
    },
    alignContent: {
      control: "select",
      options: [
        "normal",
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "safe right",
        "unsafe right",
        "safe end",
        "unsafe end",
        "safe flex-end",
        "unsafe flex-end",
      ],
    },
    alignSelf: {
      control: "select",
      options: [
        "auto",
        "normal",
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "safe right",
        "unsafe right",
        "safe end",
        "unsafe end",
        "safe flex-end",
        "unsafe flex-end",
      ],
    },
    justifyContent: {
      control: "select",
      options: [
        "start",
        "end",
        "flex-start",
        "flex-end",
        "center",
        "left",
        "right",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch",
      ],
    },
    justifyItems: {
      control: "select",
      options: [
        "auto",
        "normal",
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "baseline",
        "first baseline",
        "last baseline",
        "legacy center",
        "legacy right",
        "legacy end",
        "legacy flex-end",
      ],
    },
    justifySelf: {
      control: "select",
      options: [
        "auto",
        "normal",
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "safe right",
        "unsafe right",
        "safe end",
        "unsafe end",
        "safe flex-end",
        "unsafe flex-end",
      ],
    },
    placeItems: {
      control: "select",
      options: [
        "stretch",
        "start",
        "center",
        "end",
        "left",
        "right",
        "auto center",
        "normal start",
        "center normal",
        "start auto",
        "end normal",
        "self-start auto",
        "self-end normal",
        "flex-start auto",
        "flex-end normal",
        "left auto",
        "right normal",
        "baseline normal",
        "first baseline auto",
        "last baseline normal",
        "stretch auto",
      ],
    },
    placeContent: {
      control: "text", //too many options
    },
    flexGrow: { control: "number" },
    flexShrink: { control: "number" },
    flexBasis: { control: "text" },
    gap: { control: "text" },
    rowGap: { control: "text" },
    columnGap: { control: "text" },
  },
};

export const Playground = {
  args: {
    inline: false,
  },
};
