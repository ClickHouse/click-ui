import { GridCenter } from "@/components/commonElement";
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from "@/components/ConfirmationDialog/ConfirmationDialog";

const ConfirmationDialogComponent = ({
  disabled,
  loading,
  message,
  onCancel,
  onConfirm,
  open,
  primaryActionLabel,
  secondaryActionLabel,
  showClose,
  title,
}: ConfirmationDialogProps) => (
  <GridCenter>
    <ConfirmationDialog
      disabled={disabled}
      loading={loading}
      message={message}
      onCancel={onCancel}
      onConfirm={onConfirm}
      open={open}
      primaryActionLabel={primaryActionLabel}
      secondaryActionLabel={secondaryActionLabel}
      showClose={showClose}
      title={title}
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
    disabled: false,
    loading: false,
    message:
      "This is a simple dialog that cab be used to ask a confirmation of the action requested",
    open: true,
    onCancel: () => {
      console.log("Cancel");
    },
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
