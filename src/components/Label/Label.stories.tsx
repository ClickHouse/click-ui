import { useId } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/Label';
import type { LabelProps } from './Label.types';

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'Forms/Label',
  tags: ['form-field', 'label', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Label>;

const LabelHarness = ({ disabled, error, children }: LabelProps) => {
  const inputId = useId();
  return (
    <div
      data-testid="label-harness"
      style={{
        display: 'inline-flex',
        padding: '8px',
        background: 'transparent',
      }}
    >
      <Label
        disabled={disabled}
        error={error}
        htmlFor={inputId}
      >
        {children}
        <input id={inputId} />
      </Label>
    </div>
  );
};

const PlaygroundRender = (args: LabelProps) => {
  const inputId = useId();
  return (
    <Label
      {...args}
      htmlFor={inputId}
    >
      {args.children}
      <input id={inputId} />
    </Label>
  );
};

export const Playground: Story = {
  args: {
    children: 'Form Field label',
    error: false,
    disabled: false,
  },
  render: args => <PlaygroundRender {...args} />,
};

export const Default: Story = {
  render: () => <LabelHarness>Form Field label</LabelHarness>,
};

export const Disabled: Story = {
  render: () => <LabelHarness disabled>Form Field label</LabelHarness>,
};

export const Error: Story = {
  render: () => <LabelHarness error>Form Field label</LabelHarness>,
};
