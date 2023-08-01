import { TooltipProps } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipProvider } from "./Tooltip";

interface Props extends TooltipProps {
  showArrow?: boolean;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  side: "top" | "right" | "left" | "bottom";
}
const TooltipExample = ({
  delayDuration,
  skipDelayDuration,
  showArrow,
  disableHoverableContent,
  side,
  ...props
}: Props) => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <TooltipProvider
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
        skipDelayDuration={skipDelayDuration}
      >
        <Tooltip {...props}>
          <Tooltip.Trigger>
            <div>Tooltip Trigger(Hover)</div>
          </Tooltip.Trigger>
          <Tooltip.Content
            showArrow={showArrow}
            side={side}
          >
            Tooltip content
          </Tooltip.Content>
        </Tooltip>
      </TooltipProvider>
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
    delayDuration: { control: "number" },
    skipDelayDuration: { control: "number" },
    disableHoverableContent: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
  },
};

export const Playground = {
  args: {
    side: "bottom",
    showArrow: true,
  },
};
