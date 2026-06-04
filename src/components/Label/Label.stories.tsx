import { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/Label';

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'Forms/Label',
  tags: ['form-field', 'label', 'autodocs'],
  args: {
    children: 'Form Field label',
  },
  // Nest the input inside Label so the browser associates them implicitly.
  // Explicit htmlFor/id would collide across stories on the autodocs page,
  // since each story renders in its own React root and shares the document.
  render: args => (
    <Label
      disabled={args.disabled}
      error={args.error}
    >
      {args.children}
      <input />
    </Label>
  ),
  decorators: [
    Story => (
      <div
        data-testid="label-harness"
        style={{
          display: 'inline-flex',
          padding: '8px',
          background: 'transparent',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  args: {
    children: 'Form Field label',
    error: false,
    disabled: false,
  },
};

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true },
};
