import { Container, Text } from "@/components";
import { useClickUITheme } from "@/theme";
import styles from "./chartColors.stories.module.scss";

const ChartColorsDemo = () => {
  const { theme } = useClickUITheme();
  return (
    <Container
      gap="sm"
      padding="sm"
      orientation="horizontal"
      maxWidth="940px"
      wrap="wrap"
    >
      {Object.entries(theme.global.color.chart.default).map(([name, hex]) => (
        <Container
          orientation="vertical"
          maxWidth="120px"
          key={name}
        >
          <Text>{name}</Text>
          <Container
            className={styles.cuiColorBox}
            style={{ backgroundColor: hex as string }}
            maxWidth="40px"
            padding="md"
          />
          <Text>{hex as string}</Text>
        </Container>
      ))}
    </Container>
  );
};

export default {
  title: "Colors/Chart Colors",
  tags: ["autodocs", "color", "chart"],
  render: () => <ChartColorsDemo />,
};

export const Playground = {
  render: () => <ChartColorsDemo />,
};
