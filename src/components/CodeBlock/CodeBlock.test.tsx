import { renderCUI } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { CodeBlock } from '@/components/CodeBlock';

describe('CodeBlock', () => {
  const renderCodeBlock = (children: React.ReactNode, language = 'bash') =>
    renderCUI(<CodeBlock language={language}>{children}</CodeBlock>);

  it('renders a plain string', () => {
    const { container } = renderCodeBlock('echo hello');
    expect(container.textContent).toContain('echo hello');
  });

  it('renders $VARIABLE syntax as literal text', () => {
    const { container } = renderCodeBlock('export FOO="$BAR"');
    expect(container.textContent).toContain('$BAR');
  });

  it('renders angle-bracket placeholders as literal text instead of [object Object]', () => {
    const { container } = renderCodeBlock(
      <>
        {'export PROJECT_ID="'}
        <project-id />
        {'"'}
      </>
    );
    expect(container.textContent).not.toContain('[object Object]');
    expect(container.textContent).toContain('project-id');
  });

  it('copies the plain-text string to clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const code = 'echo hello';
    const { getByRole } = renderCodeBlock(code);

    await userEvent.click(getByRole('button'));
    expect(writeText).toHaveBeenCalledWith(code);
  });

  it('calls onCopy with the plain-text string', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const onCopy = vi.fn();

    const code = 'echo hello';
    const { getByRole } = renderCUI(
      <CodeBlock
        language="bash"
        onCopy={onCopy}
      >
        {code}
      </CodeBlock>
    );

    await userEvent.click(getByRole('button'));
    expect(onCopy).toHaveBeenCalledWith(code);
  });
});
