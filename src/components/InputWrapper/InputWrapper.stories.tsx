import { Meta, StoryObj } from '@storybook/react-vite';
import { InputWrapper } from '@/components/InputWrapper';

/**
 * Stories exercising InputWrapper's `StyledLabel = styled(Label)` consumer,
 * which overrides the Label base `color` via the `labelColor` prop. The base
 * `.label` rule is scoped with `:where()` to zero specificity, so the
 * consumer's 0-1-0 override wins by specificity regardless of source/bundle
 * order. Without that scope the base was a real 0-1-0 rule that tied the
 * override and could win by bundle order, silently dropping it.
 */
const meta: Meta<typeof InputWrapper> = {
  component: InputWrapper,
  title: 'Forms/InputWrapper',
  tags: ['inputWrapper'],
  decorators: [
    Story => (
      <div data-testid="inputwrapper-harness">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InputWrapper>;

export const LabelColorOverride: Story = {
  args: {
    id: 'input-with-label-color',
    label: 'Custom colored label',
    labelColor: '#ff0000',
    children: <input id="input-with-label-color" />,
  },
};
