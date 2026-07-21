import { Container } from '@/components/Container';
import { Text } from '@/components/Text';

import { useTheme } from '@/theme/ThemeContext';

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
          <Container
            maxWidth="40px"
            padding="md"
            style={{
              backgroundColor: hex,
              borderRadius: 'var(--click-grid-radii-sm)',
            }}
          />
          <Text>{hex}</Text>
        </Container>
      ))}
    </Container>
  );
};

export default {
  title: 'Colors/Chart Colors',
  tags: ['autodocs', 'color', 'chart'],
  render: () => <ChartColorsDemo />,
};

export const Playground = {
  render: () => <ChartColorsDemo />,
};
