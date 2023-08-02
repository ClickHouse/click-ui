import styled from "styled-components";
import { CUIGridContainer, CUIGridItem, GridProps } from "./GridContainer";

const ColoredDiv = styled(CUIGridItem)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.click.badge.color.background.info};
`;
const GridContainerExample = (props: GridProps) => {
  return (
    <CUIGridContainer {...props}>
      <ColoredDiv>1</ColoredDiv>
      <ColoredDiv>2</ColoredDiv>
      <ColoredDiv>3</ColoredDiv>
    </CUIGridContainer>
  );
};

export default {
  component: GridContainerExample,
  title: "Container/Grid",
  tags: ["container", "grid", "autodocs"],
  argTypes: {
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
    rows: { control: "number" },
    columns: { control: "number" },
    gap: { control: "text" },
    rowGap: { control: "text" },
    columnGap: { control: "text" },
    gridAutoFlow: { control: "text" },
    gridAutoRows: { control: "text" },
    gridAutoColumns: { control: "text" },
    gridTemplate: { control: "text" },
    gridTemplateRows: { control: "text" },
    gridTemplateColumns: { control: "text" },
    gridRow: { control: "text" },
    gridColumn: { control: "text" },
    gridArea: { control: "text" },
  },
};

export const Playground = {
  args: {},
};
