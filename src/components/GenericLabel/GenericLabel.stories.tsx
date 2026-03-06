import { Meta, StoryObj } from '@storybook/react-vite';
import { GenericLabel } from '@/components/GenericLabel';

const meta: Meta<typeof GenericLabel> = {
  component: GenericLabel,
  title: 'Forms/GenericLabel',
  tags: ['form-field', 'generic-label', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof GenericLabel>;

export const Playground: Story = {
  args: {
    children: 'Form Field generic label',
    disabled: false,
  },
  render: args => (
    <GenericLabel {...args}>
      {args.children}
      <input id="test" />
    </GenericLabel>
  ),
};
