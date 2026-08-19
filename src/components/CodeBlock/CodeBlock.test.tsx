import { waitFor } from '@testing-library/react';
import { CodeBlock } from '@/components/CodeBlock';
import { renderCUI } from '@/utils/test-utils';
import { loadLexer } from './sql/lexer';

// The ClickHouse-lexer highlighting is asynchronous (the WASM module instantiates on
// first use), so SQL blocks first render through the highlight.js fallback and then
// re-render with the lexer classes. Loading the lexer up front keeps each test to a
// single waitFor.
beforeAll(async () => {
  await loadLexer();
});

const queryOf = (container: HTMLElement): HTMLElement => {
  const code = container.querySelector('code');
  expect(code).not.toBeNull();
  return code as HTMLElement;
};

describe('CodeBlock', () => {
  it('highlights SQL with the ClickHouse lexer', async () => {
    const { container } = renderCUI(
      <CodeBlock language="sql">{"SELECT sum(x) FROM numbers WHERE s = 'str' -- c"}</CodeBlock>
    );

    await waitFor(() => expect(container.querySelector('.q-kw')).not.toBeNull());
    const code = queryOf(container);

    const keywords = Array.from(code.querySelectorAll('.q-kw')).map(el => el.textContent);
    expect(keywords).toEqual(['SELECT', 'FROM', 'WHERE']);

    // `sum` is followed by `(`, so it is a function; `numbers`, `x` and `s` are plain
    // identifiers.
    expect(
      Array.from(code.querySelectorAll('.q-fn')).map(el => el.textContent)
    ).toEqual(['sum']);
    expect(
      Array.from(code.querySelectorAll('.q-id')).map(el => el.textContent)
    ).toEqual(['x', 'numbers', 's']);

    expect(code.querySelector('.q-str')?.textContent).toBe("'str'");
    expect(code.querySelector('.q-com')?.textContent).toBe('-- c');
    expect(code.querySelector('.q-op')?.textContent).toBe('=');

    // The whole input must be reproduced exactly.
    expect(code.textContent).toBe("SELECT sum(x) FROM numbers WHERE s = 'str' -- c");
  });

  it('colors matched brackets by nesting depth and leaves broken nesting uncolored', async () => {
    const { container } = renderCUI(
      <CodeBlock language="sql">{'SELECT f(g(x)), ([)]'}</CodeBlock>
    );

    await waitFor(() => expect(container.querySelector('.q-br0')).not.toBeNull());
    const code = queryOf(container);

    // f(...) is depth 0, g(...) is depth 1.
    expect(
      Array.from(code.querySelectorAll('.q-br0')).map(el => el.textContent)
    ).toEqual(['(', ')']);
    expect(
      Array.from(code.querySelectorAll('.q-br1')).map(el => el.textContent)
    ).toEqual(['(', ')']);

    // `([)]` breaks the nesting: none of its brackets gets a rainbow color.
    expect(code.querySelectorAll('[class^="q-br"]').length).toBe(4);
  });

  it('underlines digit-group separators in long numbers', async () => {
    const { container } = renderCUI(
      <CodeBlock language="sql">{'SELECT 1234567'}</CodeBlock>
    );

    await waitFor(() => expect(container.querySelector('.q-num')).not.toBeNull());
    const code = queryOf(container);

    const numberSpans = Array.from(code.querySelectorAll('.q-num'));
    expect(numberSpans.map(el => el.textContent).join('')).toBe('1234567');
    // 1̲234̲567: the digits at the group boundaries are underlined.
    const underlined = numberSpans.filter(
      el => (el as HTMLElement).style.textDecoration === 'underline'
    );
    expect(underlined.map(el => el.textContent)).toEqual(['1', '4']);
  });

  it('renders an un-lexable tail with the error style', async () => {
    const { container } = renderCUI(<CodeBlock language="sql">{'SELECT `'}</CodeBlock>);

    await waitFor(() => expect(container.querySelector('.q-err')).not.toBeNull());
    expect(queryOf(container).querySelector('.q-err')?.textContent).toBe('`');
  });

  it('shows inline line numbers for SQL', async () => {
    const { container } = renderCUI(
      <CodeBlock
        language="sql"
        showLineNumbers
      >
        {'SELECT 1\nFROM numbers'}
      </CodeBlock>
    );

    await waitFor(() => expect(container.querySelector('.q-kw')).not.toBeNull());
    const numbers = Array.from(
      queryOf(container).querySelectorAll('.react-syntax-highlighter-line-number')
    );
    expect(numbers.map(el => el.textContent)).toEqual(['1', '2']);
  });

  it('keeps the highlight.js rendering for other languages', () => {
    const { container } = renderCUI(
      <CodeBlock language="json">{'{"key": "value"}'}</CodeBlock>
    );

    const code = queryOf(container);
    expect(code.textContent).toBe('{"key": "value"}');
    expect(code.querySelector('.q-kw')).toBeNull();
    // highlight.js classified the key and inlined the hljs-attr color (#88aece in the
    // default dark theme).
    const spans = Array.from(code.querySelectorAll('span'));
    const key = spans.find(el => el.textContent === '"key"') as HTMLElement;
    expect(key).not.toBeUndefined();
    expect(key.style.color).toBe('rgb(136, 174, 206)');
  });
});
