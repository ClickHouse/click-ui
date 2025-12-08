import { Container } from "./Container";
import { Text } from "@/components";
import styles from "./Container.stories.module.scss";

const ContainerExample = ({ ...props }) => {
  return (
    <div className={styles.cuiGridCenter}>
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
    </div>
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
    maxWidth: "auto",
    minWidth: "auto",
    orientation: "horizontal",
    padding: "none",
    shrink: "0",
    wrap: "nowrap",
  },
};
