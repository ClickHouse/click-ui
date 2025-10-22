import { Container, Text } from "@/components";
import clsx from "clsx";
import styles from "./chartColors.stories.module.scss";
import { useCUITheme } from "@/theme/ClickUIProvider";
import { capitalize } from "@/utils/capitalize";

const defaultStory = {
  title: "Colors/Chart Colors",
  tags: ["autodocs", "color", "chart"],
  render: () => {
    const { theme } = useCUITheme();
    return (
      <Container
        gap="sm"
        padding="sm"
        orientation="horizontal"
      >
        {Object.entries(theme.global.color.chart.default).map(([name, hex]) => {
          return (
            <Container orientation="vertical">
              <Text>{name}</Text>
              <Container
                className={clsx(styles.cuiColorBox, styles[`cui${capitalize(name)}`])}
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
