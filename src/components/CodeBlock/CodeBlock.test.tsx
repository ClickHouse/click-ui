import { CodeBlock } from '@/components/CodeBlock';
import { fireEvent } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';

describe('CodeBlock', () => {
  it('exposes accessible labels for the action buttons', () => {
    const { getByRole } = renderCUI(
      <CodeBlock
        language="sql"
        showWrapButton
      >
        SELECT 1
      </CodeBlock>
    );

    expect(getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Wrap long lines' })).toBeInTheDocument();
  });

  it('toggles the wrap button label and pressed state when clicked', () => {
    const { getByRole } = renderCUI(
      <CodeBlock
        language="sql"
        showWrapButton
      >
        SELECT 1
      </CodeBlock>
    );

    const wrapButton = getByRole('button', { name: 'Wrap long lines' });
    expect(wrapButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(wrapButton);

    expect(getByRole('button', { name: 'Disable line wrapping' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});
