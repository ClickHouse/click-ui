import { useContext } from "react";
import { ThemeContext, ThemeContextValue } from "./context";

// Custom hook with error boundary
export const useCUITheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useCUITheme must be used within a ClickUIProvider. " +
        "Make sure your component is wrapped with <ClickUIProvider>."
    );
  }

  return context;
};

// Export enhanced hook
export { useCUITheme as useClickUITheme };
