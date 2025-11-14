import { Container, Text } from "@/components";
import { ReactElement, memo } from "react";
import clsx from "clsx";
import styles from "./ChartColorComponent.module.scss";
import { useCUITheme } from "@/theme/ClickUIProvider";
import { capitalize } from "@/utils/capitalize";

export const ChartColorComponent = memo((): ReactElement => {
  const { theme } = useCUITheme();
  return (
    <Container
      gap="sm"
      padding="sm"
      orientation="horizontal"
      fillWidth
    >
      {Object.entries(theme.global.color.chart.default).map(([name, hex]) => {
        return (
          <Container
            orientation="vertical"
            fillWidth
          >
            <Text>{name}</Text>
            <Container
              className={clsx(styles.cuiColorBox, styles[`cui${capitalize(name)}`])}
              fillWidth
              maxWidth="40px"
              padding="md"
            />
            <Text>{hex as string}</Text>
          </Container>
        );
      })}
    </Container>
  );
});
