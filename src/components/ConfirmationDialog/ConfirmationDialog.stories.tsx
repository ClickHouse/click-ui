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
    >
    </ConfirmationDialog>
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
    onOpenChange: (b: boolean) => {
      void b;
    },
    onPrimaryActionClick: () => {
      console.log("Click");
    },
    primaryActionLabel: "Confirm",
    secondaryActionLabel: "Cancel",
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
