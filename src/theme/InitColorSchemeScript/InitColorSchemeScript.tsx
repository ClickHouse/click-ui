import { THEME_ATTRIBUTE } from '@/utils/dom';
import { CUI_THEME_STORAGE_KEY } from '@/utils/localStorage';
import { ThemeName  } from '@/theme';

export interface InitColorSchemeScriptProps {
  defaultTheme?: ThemeName;
  storageKey?: string;
  attribute?: string;
  nonce?: string;
}

// TODO: This should not have dark light hard-typed
// once PRs merged https://github.com/ClickHouse/click-ui/pull/784
export const InitColorSchemeScript = ({
  defaultTheme = 'light',
  storageKey = CUI_THEME_STORAGE_KEY,
  attribute = THEME_ATTRIBUTE,
  nonce,
}: InitColorSchemeScriptProps) => {
  return (
    <script
      suppressHydrationWarning
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(function() {
try {
  const theme = localStorage.getItem('${storageKey}') || '${defaultTheme}';
  const dark = 'dark';
  const light = 'light';
  let colorScheme = '';

  if (theme === 'system') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark;
    } else {
      colorScheme = light;
    }
  }
  if (theme === 'light') {
    colorScheme = light;
  }
  if (theme === 'dark') {
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

export default InitColorSchemeScript;
