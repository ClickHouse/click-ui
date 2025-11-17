import { Container, Text } from "@/components";
import styled, { useTheme } from "styled-components";

const ColorBox = styled(Container)<{ $color: string }>`
  ${({ $color }) => `
    background-color: ${$color};
  `}
  border-radius: 4px;
`;

const ChartColorsDemo = () => {
  const theme = useTheme();
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
          <ColorBox
            $color={hex}
            maxWidth="40px"
            padding="md"
          />
          <Text>{hex}</Text>
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
