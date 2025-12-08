import { Container } from "@/components/Container/Container";
import { Text } from "@/components/Typography/Text/Text";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { ChartTooltip } from "./ChartTooltip";
import { useCUITheme } from "@/theme/ClickUIProvider";

interface LineDataPoint {
  name: string;
  series1: number;
  series2: number;
  series3: number;
  series4: number;
  series5: number;
}

const multiSeriesData: LineDataPoint[] = [
  { name: "Jan", series1: 30, series2: 45, series3: 35, series4: 50, series5: 40 },
  { name: "Feb", series1: 45, series2: 38, series3: 42, series4: 55, series5: 35 },
  { name: "Mar", series1: 38, series2: 50, series3: 48, series4: 45, series5: 42 },
  { name: "Apr", series1: 50, series2: 42, series3: 40, series4: 60, series5: 48 },
  { name: "May", series1: 42, series2: 55, series3: 45, series4: 50, series5: 52 },
  { name: "Jun", series1: 55, series2: 48, series3: 52, series4: 65, series5: 45 },
];

export const MultiLineChart = () => {
  const { theme } = useCUITheme();
  const chartColors = Object.values(theme.global.color.chart.default);
  return (
    <Container
      orientation="vertical"
      gap="sm"
      fillWidth
    >
      <Text weight="semibold">Multi-Line Chart</Text>
      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <LineChart data={multiSeriesData}>
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
            <Line
              key={index}
              type="monotone"
              dataKey={`series${index + 1}`}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};
