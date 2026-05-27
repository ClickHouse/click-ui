import { TextField } from '@/components/TextField';
import { renderCUI } from '@/utils/test-utils';
import { useState } from 'react';

const TextFieldWrapper = ({
  initialText = '',
  label,
  labelColor,
}: {
  initialText?: string;
  label: string;
  labelColor?: string;
}) => {
  const [text, setText] = useState<string>(initialText);

  console.log(text);
  return (
    <TextField
      label={label}
      labelColor={labelColor}
      onChange={setText}
      value={text}
    />
  );
};

describe('TextField', () => {
  describe('label color', () => {
    it('renders the label without an explicit color override when labelColor is not set', () => {
      const label = 'Hello there!';
      const text = 'General Kenobi';

      const { getByText } = renderCUI(
        <TextFieldWrapper
          label={label}
          initialText={text}
        />
      );

      const labelElement = getByText(label);
      expect(labelElement).toBeInTheDocument();
      // The Label's default color is set via the CSS Module rule
      // `.label { color: var(--click-field-color-label-default) }`, which
      // jsdom does not load. Visual parity is covered by the Playwright
      // suite at tests/display/label.spec.ts. The assertion below verifies
      // the InputWrapper does not inject a styled-components color override
      // when no labelColor prop is passed.
      expect(labelElement.getAttribute('style')).not.toContain('color');
    });

    it('is the color of the passed in labelColor', () => {
      const label = 'Hello there!';

      const { getByText } = renderCUI(
        <TextFieldWrapper
          label={label}
          labelColor="#FF0000"
        />
      );

      const labelElement = getByText(label);
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveStyle('color: #FF0000');
    });
  });
});
