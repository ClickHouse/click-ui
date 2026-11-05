import { fireEvent } from '@testing-library/react';
import { RadioGroup } from '@/components/RadioGroup';
import { RadioGroupProps } from '@/components/RadioGroup';
import { renderCUI } from '@/utils/test-utils';

describe('RadioGroup', () => {
  const renderRadioGroup = (props: RadioGroupProps) =>
    renderCUI(
      <RadioGroup
        inline
        {...props}
      >
        <RadioGroup.Item
          id="RadioButton1"
          label="Radio Button1"
          value="RadioButton1"
        />
        <RadioGroup.Item
          label="Radio Button2"
          value="RadioButton2"
          id="RadioButton2"
        />
        <RadioGroup.Item
          label="Radio Button3"
          value="RadioButton3"
          id="RadioButton3"
        />
      </RadioGroup>
    );

  it('should execute action on click', () => {
    const handleClick = vi.fn();
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
    });
    const radio = getByLabelText('Radio Button1');
    expect(radio.dataset.state).toBe('unchecked');
    fireEvent.click(radio);
    expect(radio.dataset.state).toBe('checked');
    expect(handleClick).toBeCalledTimes(1);
  });

  it('should not execute action on click if the radio is disabled', () => {
    const handleClick = vi.fn();
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
      disabled: true,
    });
    const radio = getByLabelText('Radio Button2');
    expect(radio.dataset.state).toBe('unchecked');
    expect(radio).not.toBeNull();
    fireEvent.click(radio);
    expect(radio.dataset.state).toBe('unchecked');
    expect(handleClick).toBeCalledTimes(0);
  });

  describe('accessible name', () => {
    it('names the group from its label', () => {
      const { getByRole } = renderRadioGroup({ label: 'Plan' });
      expect(getByRole('radiogroup', { name: 'Plan' })).toBeInTheDocument();
    });

    it('names the group from its label when the group has an id', () => {
      const { getByRole } = renderRadioGroup({ label: 'Plan', id: 'plan' });
      const group = getByRole('radiogroup', { name: 'Plan' });
      expect(group).toHaveAttribute('id', 'plan');
    });

    it('keeps a consumer aria-label on the group', () => {
      const { getByRole } = renderRadioGroup({
        label: 'Plan',
        'aria-label': 'Billing plan',
      });
      expect(getByRole('radiogroup', { name: 'Billing plan' })).toBeInTheDocument();
    });

    it('keeps a consumer aria-labelledby on the group', () => {
      const { getByRole } = renderCUI(
        <>
          <span id="external-label">Billing plan</span>
          <RadioGroup
            label="Plan"
            aria-labelledby="external-label"
          >
            <RadioGroup.Item
              label="Pro"
              value="pro"
            />
          </RadioGroup>
        </>
      );
      expect(getByRole('radiogroup', { name: 'Billing plan' })).toBeInTheDocument();
    });

    it('keeps the label name when a wrapper passes aria-labelledby as undefined', () => {
      const { getByRole } = renderRadioGroup({
        label: 'Plan',
        'aria-labelledby': undefined,
      });
      expect(getByRole('radiogroup')).toHaveAccessibleName('Plan');
    });

    it('keeps the label name when a wrapper passes an empty aria-labelledby', () => {
      const { getByRole } = renderRadioGroup({
        label: 'Plan',
        'aria-labelledby': '',
      });
      expect(getByRole('radiogroup')).toHaveAccessibleName('Plan');
    });

    it('names an item from the text of a JSX label', () => {
      const { getByRole } = renderCUI(
        <RadioGroup label="Plan">
          <RadioGroup.Item
            label={<strong>Pro</strong>}
            value="pro"
          />
        </RadioGroup>
      );
      expect(getByRole('radio', { name: 'Pro' })).toBeInTheDocument();
    });

    it('puts a consumer aria-label and aria-describedby on the radio', () => {
      const { getByRole } = renderCUI(
        <>
          <span id="pro-hint">Billed yearly</span>
          <RadioGroup label="Plan">
            <RadioGroup.Item
              label="Pro"
              value="pro"
              aria-label="Consumer name"
              aria-describedby="pro-hint"
            />
          </RadioGroup>
        </>
      );
      const radio = getByRole('radio', { name: 'Consumer name' });
      expect(radio).toHaveAccessibleDescription('Billed yearly');
    });

    it('does not set an item aria-label from a missing label', () => {
      const { getByRole } = renderCUI(
        <RadioGroup label="Plan">
          <RadioGroup.Item value="pro" />
        </RadioGroup>
      );
      expect(getByRole('radio')).not.toHaveAttribute('aria-label');
    });
  });
});
