import { Button, Checkbox } from "..";
import { GridCenter } from "../commonElement";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
import { Popover } from "./Popover";

const PopoverComponent = ({
  open,
  modal,
  showArrow,
  showClose,
  forceMount,
  side,
  type,
}: {
  open: "default" | "open" | "closed";
  modal: boolean;
  showArrow: boolean;
  showClose: boolean;
  forceMount?: boolean;
  side: "top" | "right" | "left" | "bottom";
  type: "text" | "button";
}) => (
  <GridCenter>
    <Popover
      open={open === "default" ? undefined : open === "open"}
      modal={modal}
    >
      <Popover.Trigger>
        {type === "text" ? "Click Here" : <Button>Click Here</Button>}
      </Popover.Trigger>
      <Popover.Content
        side={side}
        showArrow={showArrow}
        showClose={showClose}
        forceMount={forceMount ? true : undefined}
      >
        <Title type="h2">Content popover</Title>
        <br />
        <Text>Click on the input element below.</Text>
        <br />
        <Checkbox label="This is a sample data to experiment the popover" />
      </Popover.Content>
    </Popover>
  </GridCenter>
);

export default {
  component: PopoverComponent,
  title: "Display/Popover",
  tags: ["autodocs", "form-field", "popover"],
  argTypes: {
    open: { control: "inline-radio", options: ["default", "open", "closed"] },
    modal: { control: "boolean" },
    showArrow: { control: "boolean" },
    showClose: { control: "boolean" },
    forceMount: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
    type: { control: "inline-radio", options: ["text", "button"] },
  },
};

export const Playground = {
  args: {
    open: "default",
    showArrow: true,
    showClose: true,
    side: "bottom",
    type: "text",
  },
};
