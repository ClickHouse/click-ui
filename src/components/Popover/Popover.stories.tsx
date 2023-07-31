import { Button, Checkbox } from "..";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
import { Popover } from "./Popover";

const PopoverComponent = ({
  open,
  modal,
  showArrow,
  showClose,
  forceMount,
}: {
  open: "default" | "open" | "closed";
  modal: boolean;
  showArrow: boolean;
  showClose: boolean;
  forceMount?: boolean;
}) => (
  <Popover
    open={open === "default" ? undefined : open === "open"}
    modal={modal}
  >
    <Popover.Trigger>
      <Button>Click Here</Button>
    </Popover.Trigger>
    <Popover.Content
      showArrow={showArrow}
      showClose={showClose}
      forceMount={forceMount ? true : undefined}
    >
      <Title type='h2'>Content popover</Title>
      <br />
      <Text>Click on the input element below.</Text>
      <br />
      <Checkbox label="This is a sample data to experiment the popover" />
    </Popover.Content>
  </Popover>
);

export default {
  component: PopoverComponent,
  title: "Display/Popover",
  tags: ["autodocs","form-field", "popover"],
  argTypes: {
    open: { control: "inline-radio", options: ["default", "open", "closed"] },
    modal: { control: "boolean" },
    showArrow: { control: "boolean" },
    showClose: { control: "boolean" },
    forceMount: { control: "boolean" },
  },
};

export const Default = {
  args: {
    open: "default",
    showArrow: true,
    showClose: true,
  },
};
