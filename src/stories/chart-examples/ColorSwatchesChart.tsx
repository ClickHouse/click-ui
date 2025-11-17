import { Container, Text } from "@/components";
import clsx from "clsx";
import styles from "../ChartColorComponent.module.scss";
import { capitalize } from "@/utils/capitalize";
import { useCUITheme } from "@/theme/ClickUIProvider";

export const ColorSwatchesChart = () => {
  const { theme } = useCUITheme();

  console.log(theme.global.color.chart.default);
  return (
    <Container
      gap="sm"
      orientation="horizontal"
      fillWidth
    >
      {Object.entries(theme.global.color.chart.default).map(([name, hex]) => (
        <Container
          key={name}
          orientation="vertical"
          fillWidth
        >
          <Text>{name}</Text>
          <Container
            className={clsx(styles.cuiColorBox, styles[`cui${capitalize(name)}`])}
            fillWidth
            maxWidth="30px"
            padding="md"
          />
          <Text size="sm">{hex as string}</Text>
        </Container>
      ))}
    </Container>
  );
};
