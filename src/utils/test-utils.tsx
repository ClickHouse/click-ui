import { type ThemeName } from "@/theme";
import { render as renderTL } from "@testing-library/react";
import { ClickUIProvider } from "..";

const renderCUI = (children: React.ReactNode, theme: ThemeName = "dark") => {
  return renderTL(
    <ClickUIProvider
      theme={theme}
      delayDuration={0}
    >
      {children}
    </ClickUIProvider>
  );
};

export { renderCUI };
