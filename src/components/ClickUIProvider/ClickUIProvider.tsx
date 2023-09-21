import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { ToastProps } from "@radix-ui/react-toast";
import { ToastProvider } from "@/components/Toast/Toast";
import { ThemeName } from "@/theme";
import { ThemeProvider } from "@/theme/theme";

type Props = TooltipProviderProps &
  ToastProps & {
    theme: ThemeName;
  };

const ClickUIProvider = ({
  children,
  theme,
  delayDuration,
  skipDelayDuration,
  disableHoverableContent,
  ...props
}: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider {...props}>
        <TooltipProvider
          delayDuration={delayDuration}
          skipDelayDuration={skipDelayDuration}
          disableHoverableContent={disableHoverableContent}
        >
          {children}
        </TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default ClickUIProvider;
