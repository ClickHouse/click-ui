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
  const theme = localStorage.getItem('${storageKey}') || '${defaultTheme}';
  const dark = '${THEMES.Dark}';
  const light = '${THEMES.Light}';
  let colorScheme = '';

  if (theme === '${THEMES.Light}') {
    colorScheme = light;
  }
  if (theme === '${THEMES.Dark}') {
    colorScheme = dark;
  }
  if (colorScheme) {
    document.documentElement.setAttribute('${attribute}', colorScheme);
  }
} catch(e){}})();`,
      }}
    />
  );
};

export default InitCUIThemeScript;
