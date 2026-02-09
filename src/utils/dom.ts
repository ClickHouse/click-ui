const THEME_ATTRIBUTE = 'data-cui-theme';

// TODO: This should not be hard-typed once PRs merged https://github.com/ClickHouse/click-ui/pull/784 replace it
type Theme = 'dark' | 'light';

const getDOMElement = (selector: string) => {
  const el = document.querySelector(selector) as HTMLElement | null;

  if (!el) {
    console.warn(`Missing DOM element <${selector}>!`);
    return null;
  }

  return el;
}

export const setRootThemeAttribute = (theme: Theme) => {
  const el = getDOMElement('html');

  if (!el) return;

  el.setAttribute(THEME_ATTRIBUTE, theme);
}

export const removeRootThemeAttribute = () => {
  const el = getDOMElement('html');

  if (!el) return;

  el.removeAttribute(THEME_ATTRIBUTE);
}
