import { Container, Text } from "@/components";
import styled, { useTheme } from "styled-components";

const ColorBox = styled(Container)<{
  $color: string;
}>`
  ${({ $color }): string => `
    background-color: ${$color};
  `};
  border-radius: 4px;
`;

const defaultStory = {
  title: "Colors/Chart Colors",
  tags: ["autodocs", "color", "chart"],
  render: () => {
    const theme = useTheme();
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
              <ColorBox
                $color={hex}
                maxWidth="40px"
                padding="md"
              />
              <Text>{hex}</Text>
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
