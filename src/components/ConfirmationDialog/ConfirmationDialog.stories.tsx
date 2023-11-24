import { GridCenter } from "../commonElement";
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from "@/components/ConfirmationDialog/ConfirmationDialog";

const ConfirmationDialogComponent = ({
  open,
  title,
  message,
  primaryActionLabel,
  onConfirm,
  secondaryActionLabel,
  onCancel,
  showClose,
}: ConfirmationDialogProps) => (
  <GridCenter>
    <ConfirmationDialog
      open={open}
      title={title}
      message={message}
      onCancel={onCancel}
      primaryActionLabel={primaryActionLabel}
      onConfirm={onConfirm}
      secondaryActionLabel={secondaryActionLabel}
      showClose={showClose}
    ></ConfirmationDialog>
  </GridCenter>
);

export default {
  component: ConfirmationDialogComponent,
  title: "Display/ConfirmationDialog",
  tags: ["autodocs", "confirmation dialog"],
  argTypes: {
    open: {
      options: [true, false, undefined],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    title: "Example dialog title",
    message:
      "This is a simple dialog that cab be used to ask a confirmation of the action requested",
    open: true,
    onCancel: () => {},
    onConfirm: () => {
      console.log("Click");
    },
    primaryActionLabel: "Confirm",
    secondaryActionLabel: "Cancel",
    showClose: false,
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};
