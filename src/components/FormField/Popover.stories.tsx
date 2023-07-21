import Popover from "./Popover";

const PopoverComponent = ({
  open,
  modal,
  showArrow,
  showClose,
  forceMount,
}: {
  open?: boolean;
  modal: boolean;
  showArrow: boolean;
  showClose: boolean;
  forceMount?: boolean;
}) => (
  <Popover
    open={open}
    modal={modal}
  >
    <Popover.Trigger>
      <div>Click here</div>
    </Popover.Trigger>
    <Popover.Content
      showArrow={showArrow}
      showClose={showClose}
      forceMount={forceMount ? true : undefined}
    >
      Content popover
    </Popover.Content>
  </Popover>
);

export default {
  component: PopoverComponent,
  title: "Popover",
  tags: ["form-field", "popover"],
  argTypes: {
    open: { control: "boolean" },
    modal: { control: "boolean" },
    showArrow: { control: "boolean" },
    showClose: { control: "boolean" },
    forceMount: { control: "boolean" },
  },
};

export const Default = {
  args: {},
};
