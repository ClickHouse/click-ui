import { GridCenter } from "../commonElement";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";

const ConfirmationDialogComponent = ({
  open,
  title,
  message,
  primaryActionLabel,
  onPrimaryAcyion,
  secondaryActionLabel,
  onOpenChange,
}) => (
  <GridCenter>
    <ConfirmationDialog
      open={open}
      title={title}
      message={message}
      onOpenChange={onOpenChange}
      primaryActionLabel={primaryActionLabel}
      onPrimaryAction={onPrimaryAcyion}
      secondaryActionLabel={secondaryActionLabel}
    />
  </GridCenter>
);

export default {
  component: ConfirmationDialogComponent,
  title: "Display/ConfirmationDialog",
  tags: ["confirmation dialog"],
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
    open: false,
    onOpenChange: (b: boolean) => {
      void b;
    },
    onPrimaryAcyion: () => {
      console.log("Click");
    },
    primaryActionLabel: "Confirm",
    secondaryActionLabel: "Cancel",
  },
};
