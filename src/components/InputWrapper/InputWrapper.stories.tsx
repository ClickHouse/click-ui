import { Meta, StoryObj } from '@storybook/react-vite';
import { InputWrapper } from '@/components/InputWrapper';

/**
 * Stories exercising InputWrapper's `StyledLabel = styled(Label)` consumer,
 * which overrides the Label base `color` via the `labelColor` prop. The base
 * `.label` rule is scoped with `:where()` so this equal-specificity override
 * wins; without that scope the override is silently dropped.
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
