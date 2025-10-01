import { Container, Text } from "@/components";
import clsx from "clsx";
import styles from "./chartColors.stories.module.scss";
import { useCUITheme } from "@/theme/ClickUIProvider";

const defaultStory = {
  title: "Colors/Chart Colors",
  tags: ["autodocs", "color", "chart"],
  render: () => {
    const theme = useCUITheme();
    return (
      <Container
        gap="sm"
        padding="sm"
        orientation="horizontal"
      >
        {Object.entries(
          (typeof theme.theme === "object" &&
            theme.theme &&
            "global" in theme.theme &&
            typeof theme.theme.global === "object" &&
            theme.theme.global &&
            "color" in theme.theme.global &&
            typeof theme.theme.global.color === "object" &&
            theme.theme.global.color &&
            "chart" in theme.theme.global.color &&
            typeof theme.theme.global.color.chart === "object" &&
            theme.theme.global.color.chart &&
            "default" in theme.theme.global.color.chart &&
            typeof theme.theme.global.color.chart.default === "object" &&
            theme.theme.global.color.chart.default) ||
            {}
        ).map(([name, hex]) => {
          return (
            <Container orientation="vertical">
              <Text>{name}</Text>
              <Container
                className={clsx(styles.cuiColorBox, styles[`cui${name.toLowerCase()}`])}
                maxWidth="40px"
                padding="md"
              />
              <Text>{hex as string}</Text>
            </Container>
          );
        })}
      </Container>
    );
  },
};

export const Playground = {
  ...defaultStory,
};

export default defaultStory;
