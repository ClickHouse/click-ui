import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Container } from "@/components/Container/Container";
import { Text } from "@/components/Typography/Text/Text";

import { ChartTooltip } from "./ChartTooltip";
import { useCUITheme } from "@/theme/ClickUIProvider";

const areaData = [
  { name: "Week 1", series1: 25, series2: 30, series3: 28, series4: 35, series5: 22 },
  { name: "Week 2", series1: 35, series2: 40, series3: 38, series4: 45, series5: 32 },
  { name: "Week 3", series1: 30, series2: 35, series3: 42, series4: 40, series5: 38 },
  { name: "Week 4", series1: 45, series2: 42, series3: 48, series4: 50, series5: 45 },
  { name: "Week 5", series1: 40, series2: 48, series3: 45, series4: 55, series5: 42 },
];

export const StackedAreaChart = () => {
  const { theme } = useCUITheme();
  const chartColors = Object.values(theme.global.color.chart.default);
  return (
    <Container
      orientation="vertical"
      gap="sm"
      fillWidth
    >
      <Text weight="semibold">Stacked Area Chart</Text>
      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <AreaChart data={areaData}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.3}
          />
          <XAxis
            dataKey="name"
            tick={{ fontFamily: "Inter, sans-serif" }}
          />
          <YAxis tick={{ fontFamily: "Inter, sans-serif" }} />
          <Tooltip
            content={ChartTooltip}
            wrapperStyle={{ fontFamily: "Inter, sans-serif" }}
          />
          {chartColors.map((color, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={`series${index + 1}`}
              stackId="1"
              stroke={color}
              fill={color}
              fillOpacity={0.6}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};
