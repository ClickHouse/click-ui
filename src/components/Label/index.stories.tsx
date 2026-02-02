import { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/Label';

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'Forms/Label',
  tags: ['form-field', 'label', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Label>;

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
