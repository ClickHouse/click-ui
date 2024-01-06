import { GridContainer } from "./GridContainer";
import { Text } from "..";
import styled from "styled-components";

const GridCenter = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const ContainerExample = ({ ...props }) => {
  return (
    <GridCenter>
      <GridContainer
        {...props}
        style={{ border: "1px solid grey" }}
      >
        <Text>Parent container</Text>
        <div style={{ border: "1px solid grey" }}>
          <Text>Child</Text>
        </div>
        <div style={{ border: "1px solid grey" }}>
          <Text>Child</Text>
        </div>
        <div style={{ border: "1px solid grey" }}>
          <Text>Child</Text>
        </div>
      </GridContainer>
    </GridCenter>
  );
};

export default {
  component: ContainerExample,
  title: "Layout/GridContainer",
  tags: ["grid_container", "autodocs"],
  argTypes: {
    alignContent: {
      control: "select",
      options: [
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch",
        "start",
        "end",
        "left",
        "right",
      ],
    },
    alignItems: { control: "select", options: ["start", "center", "end", "stretch"] },
    columnGap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    display: {
      control: "radio",
      options: ["grid", "inline-grid"],
    },
    gap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    gridAutoFlow: {
      control: "select",
      options: ["row", "column", "row-dense", "column-dense"],
    },

    isResponsive: { control: "boolean" },
    justifyContent: {
      control: "select",
      options: [
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "stretch",
        "end",
        "left",
        "right",
      ],
    },
    justifyItems: { control: "select", options: ["start", "center", "end", "stretch"] },
    rowGap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
  },
};

export const Playground = {
  args: {
    alignContent: "stretch",
    alignItems: "stretch",
    columnGap: "none",
    display: "grid",
    gap: "",
    gridAutoColumns: "",
    gridAutoFlow: "",
    gridAutoRows: "",
    gridTemplateAreas: "",
    gridTemplateColumns: "",
    gridTemplateRows: "",
    gridTemplate: "",
    isResponsive: true,
    justifyContent: "stretch",
    justifyItems: "stretch",
    rowGap: "none",
  },
};
