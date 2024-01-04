import { Container, ContainerProps } from "./Container";
import { Text } from "..";
import styled from "styled-components";

interface Props extends ContainerProps {
  color: string;
}

const GridCenter = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const ContainerExample = ({ color, ...props }: Props) => {
  return (
    <GridCenter>
      <Container
        {...props}
        style={{ border: "1px solid grey" }}
      >
        <Text>Parent container</Text>
        <Container
          {...props}
          style={{ border: "1px solid grey" }}
        >
          <Text>Child</Text>
        </Container>
        <Container
          {...props}
          style={{ border: "1px solid grey" }}
        >
          <Text>Child</Text>
        </Container>
        <Container
          {...props}
          style={{ border: "1px solid grey" }}
        >
          <Text>Child</Text>
        </Container>
      </Container>
    </GridCenter>
  );
};
export default {
  component: ContainerExample,
  title: "Layout/Container",
  tags: ["container", "autodocs"],
  argTypes: {
    alignItems: { control: "select", options: ["start", "center", "end", "stretch"] },
    fillWidth: { control: "boolean" },
    gap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    grow: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6"],
    },
    shrink: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6"],
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
        "end",
        "left",
        "right",
      ],
    },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    padding: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
  },
};

export const Playground = {
  args: {
    alignItems: "center",
    fillWidth: false,
    gap: "none",
    grow: "0",
    isResponsive: true,
    justifyContent: "start",
    maxWidth: "3rem",
    minWidth: "20rem",
    orientation: "horizontal",
    padding: "none",
    shrink: "0",
    wrap: "nowrap",
  },
};
