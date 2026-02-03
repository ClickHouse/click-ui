import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from '@radix-ui/react-tooltip';
import { ToastProvider, ToastProviderProps } from '@/components/Toast/Toast';
import { ThemeName, THEMES } from '@/theme';
import { ThemeProvider } from '@/theme/theme';
import { ReactNode, useEffect } from 'react';
import { isValidThemeName, getFallbackThemeName } from '@/utils/theme';

interface Props {
  config?: {
    tooltip?: Omit<TooltipProviderProps, 'children'>;
    toast?: Omit<ToastProviderProps, 'children'>;
  };
  theme: ThemeName;
  children: ReactNode;
}

const ClickUIProvider = ({ children, theme, config = {} }: Props) => {
  const { toast = {}, tooltip = {} } = config;
  const hasValidTheme = isValidThemeName(theme);

  useEffect(() => {
    if (!hasValidTheme) {
      console.warn(
        `[Click UI] Unknown theme! Please use one of ${Object.keys(THEMES).join(', ')} theme instead. Falling back to 'light' theme.`
      );
    }
  }, [theme, hasValidTheme]);

  const safeTheme = getFallbackThemeName(theme);

  return (
    <ThemeProvider theme={safeTheme}>
      <ToastProvider {...toast}>
        <TooltipProvider {...tooltip}>{children}</TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default ClickUIProvider;
