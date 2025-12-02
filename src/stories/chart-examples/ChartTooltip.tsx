import { useCUITheme } from "@/theme/ClickUIProvider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChartTooltip = (props: any) => {
  const { active, payload, label } = props;
  const { theme } = useCUITheme();
  if (!active || !payload || payload.length === 0) return null;

  const background = theme.click.tooltip.color.background.default;
  const color = theme.click.tooltip.color.label.default;

  return (
    <div
      style={{
        background,
        color,
        fontFamily: "Inter, sans-serif",
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        minWidth: 80,
        maxWidth: 220,
        pointerEvents: "auto",
      }}
    >
      {label && <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>}
      {payload.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entry: any, idx: number) => (
          <div
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: entry.color,
                marginRight: 6,
              }}
            />
            <span style={{ fontWeight: 500 }}>{entry.name}:</span>
            <span style={{ marginLeft: 4 }}>{entry.value}</span>
          </div>
        )
      )}
    </div>
  );
};
