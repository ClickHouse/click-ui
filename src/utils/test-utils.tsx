import { render as renderTL } from "@testing-library/react";
import { ClickUIProvider } from "@/theme/ClickUIProvider";

// eslint-disable-next-line react-refresh/only-export-components
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ClickUIProvider config={{ tooltip: { delayDuration: 0 } }}>{children}</ClickUIProvider>
);

const renderCUI = (children: React.ReactNode) => {
  const rtlRenderResult = renderTL(<Wrapper>{children}</Wrapper>);

  return {
    ...rtlRenderResult,
    rerender: (rerenderChildren: React.ReactNode) =>
      rtlRenderResult.rerender(<Wrapper>{rerenderChildren}</Wrapper>),
  };
};

export { renderCUI };
