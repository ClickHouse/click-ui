import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { ToastProvider, ToastProviderProps } from "@/components/Toast/Toast";
import { ThemeName } from "@/theme";
import { ThemeProvider } from "@/theme/theme";
import { ReactNode, useEffect } from "react";

interface Props {
  config?: {
    tooltip?: Omit<TooltipProviderProps, "children">;
    toast?: Omit<ToastProviderProps, "children">;
  };
  theme: ThemeName;
  children: ReactNode;
}

const ClickUIProvider = ({ children, theme, config = {} }: Props) => {
  const { toast = {}, tooltip = {} } = config;

  useEffect(() => {
    if (theme === "classic") {
      console.warn(
        "[Click UI] The 'classic' theme has been removed. Please use 'light' or 'dark' theme instead. Falling back to 'light' theme."
      );
    }
  }, [theme]);

  const safeTheme = theme === "classic" ? "light" : theme;

  // Set color-scheme on document root to enable light-dark() CSS function
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.style.colorScheme = safeTheme;
    root.setAttribute("data-theme", safeTheme);
  }, [safeTheme]);

  return (
    <ThemeProvider theme={safeTheme}>
      <ToastProvider {...toast}>
        <TooltipProvider {...tooltip}>{children}</TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default ClickUIProvider;
