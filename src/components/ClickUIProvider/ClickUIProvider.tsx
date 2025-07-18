import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { ToastProvider, ToastProviderProps } from "@/components/Toast/Toast";
import { ThemeName } from "@/theme";
import { ThemeProvider } from "@/theme/theme";
import { ReactNode } from "react";

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
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider {...toast}>
        <TooltipProvider {...tooltip}>{children}</TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default ClickUIProvider;
