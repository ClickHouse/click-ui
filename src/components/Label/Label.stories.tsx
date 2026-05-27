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

const LabelHarness = ({ disabled, error, children }: LabelProps) => (
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
      htmlFor="label-harness-input"
    >
      {children}
      <input id="label-harness-input" />
    </Label>
  </div>
);

export const Playground: Story = {
  args: {
    children: 'Form Field label',
    error: false,
    disabled: false,
  },
  render: args => (
    <Label {...args}>
      {args.children}
      <input id="test" />
    </Label>
  ),
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
