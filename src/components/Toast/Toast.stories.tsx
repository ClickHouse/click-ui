import { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/Button';
import { useToast } from '@/hooks/useToast';
import { Toast, ToastProvider } from '@/components/Toast';
import type { ToastProps } from '@/components/Toast';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Display/Toast',
  tags: ['form-field', 'toast', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Toast>;

const ToastTrigger = (props: ToastProps) => {
  const { createToast } = useToast();
  return (
    <Button
      onClick={() => {
        createToast(props);
      }}
    >
      Create Toast
    </Button>
  );
};

export const Playground: Story = {
  args: {
    description: 'description',
    title: 'title',
  },
  render: args => <ToastTrigger {...args} />,
};

const STABLE_DURATION = 1000000;

/**
 * Auto-opens a single toast on mount (no click needed) so the portaled toast
 * is rendered deterministically for visual-regression snapshots. The toast is
 * given a very long duration so it stays on screen, and animations are disabled
 * via the decorator below so the slide-in frame is stable.
 */
const AutoToast = (props: ToastProps) => {
  const { createToast } = useToast();
  useEffect(() => {
    createToast({ ...props, duration: props.duration ?? STABLE_DURATION });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

// Disable Radix toast animations so the captured frame is deterministic.
const noAnimationStyle = (
  <style>{`
    [data-radix-toast-viewport] li {
      animation: none !important;
      transition: none !important;
    }
  `}</style>
);

const showcaseDecorators: Story['decorators'] = [
  Story => (
    <ToastProvider>
      {noAnimationStyle}
      <Story />
    </ToastProvider>
  ),
];

export const Default: Story = {
  decorators: showcaseDecorators,
  args: {
    type: 'default',
    title: 'Default toast',
    description: 'This is a default toast description.',
    duration: STABLE_DURATION,
  },
  render: args => <AutoToast {...args} />,
};

export const Success: Story = {
  decorators: showcaseDecorators,
  args: {
    type: 'success',
    title: 'Success toast',
    description: 'This is a success toast description.',
    duration: STABLE_DURATION,
  },
  render: args => <AutoToast {...args} />,
};

export const Warning: Story = {
  decorators: showcaseDecorators,
  args: {
    type: 'warning',
    title: 'Warning toast',
    description: 'This is a warning toast description.',
    duration: STABLE_DURATION,
  },
  render: args => <AutoToast {...args} />,
};

export const Danger: Story = {
  decorators: showcaseDecorators,
  args: {
    type: 'danger',
    title: 'Danger toast',
    description: 'This is a danger toast description.',
    duration: STABLE_DURATION,
  },
  render: args => <AutoToast {...args} />,
};

/** Title only — no description, no actions (exercises the header-only layout). */
export const TitleOnly: Story = {
  decorators: showcaseDecorators,
  args: {
    type: 'default',
    title: 'Title only toast',
    duration: STABLE_DURATION,
  },
  render: args => <AutoToast {...args} />,
};

/** Toast with action buttons (exercises the actions row). */
export const WithActions: Story = {
  decorators: showcaseDecorators,
  args: {
    type: 'default',
    title: 'Toast with actions',
    description: 'This toast has action buttons.',
    duration: STABLE_DURATION,
    actions: [
      { altText: 'Confirm', label: 'Confirm', type: 'primary' },
      { altText: 'Cancel', label: 'Cancel', type: 'secondary' },
    ],
  },
  render: args => <AutoToast {...args} />,
};
