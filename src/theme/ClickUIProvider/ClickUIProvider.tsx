import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from '@radix-ui/react-tooltip';
import { ToastProvider, ToastProviderProps } from '@/components/Toast/Toast';
import { ThemeName } from '@/theme';
import { ThemeProvider } from '@/theme/theme';
import { ReactNode, useEffect } from 'react';
import { setRootThemeAttribute, removeRootThemeAttribute } from '@/utils/dom';
import { CUI_THEME_STORAGE_KEY } from '@/utils/localStorage';

interface Props {
  config?: {
    tooltip?: Omit<TooltipProviderProps, 'children'>;
    toast?: Omit<ToastProviderProps, 'children'>;
  };
  theme: ThemeName;
  children: ReactNode;
  persistTheme?: boolean;
  storageKey?: string;
}

const ClickUIProvider = ({
  children,
  theme,
  config = {},
  persistTheme = true,
  storageKey = CUI_THEME_STORAGE_KEY,
}: Props) => {
  const { toast = {}, tooltip = {} } = config;
  // TODO: This should not be hard-typed
  // once PRs merged https://github.com/ClickHouse/click-ui/pull/784
  const safeTheme: ThemeName = theme === 'classic' ? 'light' : theme;

  useEffect(() => {
    if (theme === 'classic') {
      console.warn(
        "[Click UI] The 'classic' theme has been removed. Please use 'light' or 'dark' theme instead. Falling back to 'light' theme."
      );
    }
  }, [theme]);

  useEffect(() => {
    setRootThemeAttribute(safeTheme);

    return () => {
      removeRootThemeAttribute();
    };
  }, [safeTheme]);

  useEffect(() => {
    if (!persistTheme) {
      return;
    }

    try {
      localStorage.setItem(storageKey, safeTheme);
    } catch {
      console.warn('LocalStorage is not available!');
    }
  }, [safeTheme, persistTheme, storageKey]);

  return (
    <ThemeProvider theme={safeTheme}>
      <ToastProvider {...toast}>
        <TooltipProvider {...tooltip}>{children}</TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default ClickUIProvider;
