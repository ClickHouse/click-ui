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

export const Variations = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}
    >
      <section>
        <h3>Primary Action Types</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ConfirmationDialog
            open={true}
            title="Primary Action"
            message="Confirmation dialog with primary action button type."
            primaryActionType="primary"
            primaryActionLabel="Confirm"
            secondaryActionLabel="Cancel"
          />

          <ConfirmationDialog
            open={true}
            title="Danger Action"
            message="Confirmation dialog with danger action button type for destructive actions."
            primaryActionType="danger"
            primaryActionLabel="Delete"
            secondaryActionLabel="Cancel"
          />
        </div>
      </section>

      <section>
        <h3>Button States</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ConfirmationDialog
            open={true}
            title="Default State"
            message="Confirmation dialog with normal button state."
            disabled={false}
            loading={false}
          />

          <ConfirmationDialog
            open={true}
            title="Loading State"
            message="Confirmation dialog with loading state on primary action."
            loading={true}
          />

          <ConfirmationDialog
            open={true}
            title="Disabled State"
            message="Confirmation dialog with disabled primary action."
            disabled={true}
          />
        </div>
      </section>

      <section>
        <h3>Header Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ConfirmationDialog
            open={true}
            title="With Close Button"
            message="Confirmation dialog with close button in header."
            showClose={true}
          />

          <ConfirmationDialog
            open={true}
            title="Without Close Button"
            message="Confirmation dialog without close button."
            showClose={false}
          />
        </div>
      </section>

      <section>
        <h3>Custom Labels</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ConfirmationDialog
            open={true}
            title="Save Changes?"
            message="You have unsaved changes. Do you want to save them before leaving?"
            primaryActionLabel="Save"
            secondaryActionLabel="Don't Save"
          />

          <ConfirmationDialog
            open={true}
            title="Proceed with Action?"
            message="This action will make permanent changes to your account."
            primaryActionLabel="Yes, Proceed"
            secondaryActionLabel="No, Go Back"
            primaryActionType="danger"
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiDialogContent"],
      focus: [".cuiDialogContent"],
      focusVisible: [".cuiDialogContent"],
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 1200,
      },
    },
  },
};
