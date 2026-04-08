import { THEME_ATTRIBUTE, getRootElement } from '@clickhouse/design-tokens/legacy/utils';
import type { ThemeName } from '@clickhouse/design-tokens/legacy/theme';

export { THEME_ATTRIBUTE, getRootElement };

export const setRootThemeAttribute = (theme: ThemeName) => {
  const el = getRootElement();

  if (!el) {
    return;
  }

  el.setAttribute(THEME_ATTRIBUTE, theme);
};

export const removeRootThemeAttribute = () => {
  const el = getRootElement();

  if (!el) {
    return;
  }

  el.removeAttribute(THEME_ATTRIBUTE);
};
