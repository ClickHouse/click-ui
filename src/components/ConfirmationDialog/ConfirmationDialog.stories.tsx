import { Meta, StoryObj } from '@storybook/react-vite';
import { GridCenter } from '@/components/GridCenter';
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from '@/components/ConfirmationDialog';

const ConfirmationDialogExample = ({
  children,
  disabled,
  loading,
  message,
  onCancel,
  onConfirm,
  open,
  primaryActionLabel,
  primaryActionType,
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
      primaryActionType={primaryActionType}
      secondaryActionLabel={secondaryActionLabel}
      showClose={showClose}
      title={title}
    >
      {children}
    </ConfirmationDialog>
  </GridCenter>
);

const meta: Meta<typeof ConfirmationDialogExample> = {
  component: ConfirmationDialogExample,
  title: 'Display/ConfirmationDialog',
  tags: ['autodocs', 'confirmation dialog'],
  argTypes: {
    open: {
      options: [true, false, undefined],
      control: { type: 'radio' },
    },
    primaryActionType: {
      options: ['primary', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmationDialogExample>;

const baseArgs = {
  title: 'Example dialog title',
  disabled: false,
  loading: false,
  message:
    'This is a simple dialog that cab be used to ask a confirmation of the action requested',
  open: true,
  onCancel: () => {
    console.log('Cancel');
  },
  onConfirm: () => {
    console.log('Click');
  },
  primaryActionLabel: 'Confirm',
  secondaryActionLabel: 'Cancel',
  showClose: false,
};

const inlineParameters = {
  docs: {
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
};

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
  parameters: inlineParameters,
};

export const Primary: Story = {
  args: {
    ...baseArgs,
    primaryActionType: 'primary',
  },
  parameters: inlineParameters,
};

export const Danger: Story = {
  args: {
    ...baseArgs,
    primaryActionType: 'danger',
    primaryActionLabel: 'Delete',
  },
  parameters: inlineParameters,
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
  parameters: inlineParameters,
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
  parameters: inlineParameters,
};

export const WithClose: Story = {
  args: {
    ...baseArgs,
    showClose: true,
  },
  parameters: inlineParameters,
};
