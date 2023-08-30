import { ThemeProvider, type ThemeName } from "@/theme";
import { render as renderTL } from "@testing-library/react";

const renderCUI = (children: React.ReactNode, theme: ThemeName = "dark") => {
  return renderTL(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

export { renderCUI };
