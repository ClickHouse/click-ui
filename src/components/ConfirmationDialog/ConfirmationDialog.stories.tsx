import { Link } from "@/components";
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
  onPrimaryActionClick,
  secondaryActionLabel,
  onOpenChange,
}: ConfirmationDialogProps) => (
  <GridCenter>
    <ConfirmationDialog
      open={open}
      title={title}
      message={message}
      onOpenChange={onOpenChange}
      primaryActionLabel={primaryActionLabel}
      onPrimaryActionClick={onPrimaryActionClick}
      secondaryActionLabel={secondaryActionLabel}
    >
      <Link>Open dialog</Link>
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
