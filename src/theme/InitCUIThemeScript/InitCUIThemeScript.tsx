import { THEME_ATTRIBUTE } from '@/utils/dom';
import { CUI_THEME_STORAGE_KEY } from '@/utils/localStorage';
import { THEMES } from '@/theme/theme.core';
import type { ThemeName } from '@/theme/theme.types';

export interface InitCUIThemeScriptProps {
  defaultTheme?: ThemeName;
  storageKey?: string;
  attribute?: string;
  nonce?: string;
}

/** JS string literal safe to embed in an inline `<script>`: `<` is escaped so `</script>` cannot close the element. */
const toScriptLiteral = (value: string) => JSON.stringify(value).replace(/</g, '\\u003c');

// TODO: Provide support for system prefers-color-scheme

export const InitCUIThemeScript = ({
  defaultTheme = THEMES.Light,
  storageKey = CUI_THEME_STORAGE_KEY,
  attribute = THEME_ATTRIBUTE,
  nonce,
}: InitCUIThemeScriptProps) => {
  return (
    <script
      suppressHydrationWarning
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(function() {
try {
  const theme = localStorage.getItem(${toScriptLiteral(storageKey)}) || ${toScriptLiteral(defaultTheme)};
  const dark = ${toScriptLiteral(THEMES.Dark)};
  const light = ${toScriptLiteral(THEMES.Light)};
  let colorScheme = '';

  if (theme === light) {
    colorScheme = light;
  }
  if (theme === dark) {
    colorScheme = dark;
  }
  if (colorScheme) {
    document.documentElement.setAttribute(${toScriptLiteral(attribute)}, colorScheme);
  }
} catch(e){}})();`,
      }}
    />
  );
};

export default InitCUIThemeScript;
