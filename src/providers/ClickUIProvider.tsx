import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from '@radix-ui/react-tooltip';
import { ToastProvider, ToastProviderProps } from '@/components/Toast/Toast';
import { THEMES } from '@/theme/theme.core';
import type { ThemeName } from '@/theme/theme.types';
import { ThemeProvider } from './ThemeProvider';
import { ReactNode, useEffect } from 'react';
import { setRootThemeAttribute, removeRootThemeAttribute } from '@/utils/dom';
import { CUI_THEME_STORAGE_KEY } from '@/utils/localStorage';
import { isValidThemeName, getFallbackThemeName } from '@/theme/theme.utils';

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

export const ClickUIProvider = ({
  children,
  theme,
  config = {},
  persistTheme = true,
  storageKey = CUI_THEME_STORAGE_KEY,
}: Props) => {
  const { toast = {}, tooltip = {} } = config;
  const hasValidTheme = isValidThemeName(theme);
  const safeTheme = getFallbackThemeName(theme);

  useEffect(() => {
    if (!hasValidTheme) {
      console.warn(
        `[Click UI] Unknown theme! Please use one of ${Object.keys(THEMES).join(', ')} theme instead. Falling back to 'light' theme.`
      );
    }
  }, [theme, hasValidTheme]);

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
