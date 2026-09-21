import { renderToStaticMarkup } from 'react-dom/server';
import { InitCUIThemeScript } from '@/theme/InitCUIThemeScript';
import { renderCUI } from '@/utils/test-utils';

const TEST_ATTRIBUTE = 'data-cui-test-theme';
const AWKWARD_KEY = 'a\\b\nc"d\'e\tf';

// The script is the component's own output, not user content; running it is what the browser does before hydration.
const runScript = (container: HTMLElement) => {
  new Function(container.querySelector('script')?.textContent ?? '')();
};

describe('InitCUIThemeScript', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(TEST_ATTRIBUTE);
  });

  it('round-trips a storageKey with quotes, backslashes and newlines', () => {
    localStorage.setItem(AWKWARD_KEY, 'dark');
    const { container } = renderCUI(
      <InitCUIThemeScript
        storageKey={AWKWARD_KEY}
        attribute={TEST_ATTRIBUTE}
      />
    );

    runScript(container);

    expect(document.documentElement.getAttribute(TEST_ATTRIBUTE)).toBe('dark');
  });

  it('falls back to defaultTheme when nothing is stored', () => {
    const { container } = renderCUI(
      <InitCUIThemeScript
        defaultTheme="dark"
        storageKey={AWKWARD_KEY}
        attribute={TEST_ATTRIBUTE}
      />
    );

    runScript(container);

    expect(document.documentElement.getAttribute(TEST_ATTRIBUTE)).toBe('dark');
  });

  it('stays syntactically valid when attribute contains a quote', () => {
    const { container } = renderCUI(<InitCUIThemeScript attribute="data-it's-a-theme" />);

    expect(() => runScript(container)).not.toThrow();
  });

  it('keeps a "</script>" prop inside the script when server-rendered', () => {
    const html = renderToStaticMarkup(
      <InitCUIThemeScript
        storageKey="</script><script>alert(1)</script>"
        attribute="<!--<script>"
      />
    );

    expect(html.match(/<script/g)).toHaveLength(1);
    expect(html.match(/<\/script>/g)).toHaveLength(1);
  });
});
