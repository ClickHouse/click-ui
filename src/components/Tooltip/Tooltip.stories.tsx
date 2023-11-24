import { TooltipProps } from "./Tooltip";
import { Tooltip } from "./Tooltip";
import { Text } from "..";

interface Props extends TooltipProps {
  showArrow?: boolean;
  side: "top" | "right" | "left" | "bottom";
}
const TooltipExample = ({ showArrow, side, ...props }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Tooltip {...props}>
        <Tooltip.Trigger>
          <Text>Tooltip Trigger(Hover)</Text>
        </Tooltip.Trigger>

        <Tooltip.Content
          showArrow={showArrow}
          side={side}
        >
          Tooltip content
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
};
export default {
  component: TooltipExample,
  title: "Display/Tooltip",
  tags: ["form-field", "tooltip", "autodocs"],
  argTypes: {
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    showArrow: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
  },
};

export const Playground = {
  args: {
    side: "bottom",
    showArrow: true,
    disabled: false,
  },
};
