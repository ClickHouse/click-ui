import { type ThemeName } from '@/theme';
import { render as renderTL } from '@testing-library/react';
import { ClickUIProvider } from '..';

// eslint-disable-next-line react-refresh/only-export-components
const Wrapper = ({
  theme,
  children,
}: {
  theme: ThemeName;
  children: React.ReactNode;
}) => (
  <ClickUIProvider
    theme={theme}
    config={{ tooltip: { delayDuration: 0 } }}
  >
    {children}
  </ClickUIProvider>
);

const renderCUI = (children: React.ReactNode, theme: ThemeName = 'dark') => {
  const rtlRenderResult = renderTL(<Wrapper theme={theme}>{children}</Wrapper>);

  return {
    ...rtlRenderResult,
    rerender: (rerenderChildren: React.ReactNode) =>
      rtlRenderResult.rerender(<Wrapper theme={theme}>{rerenderChildren}</Wrapper>),
  };
};

export { renderCUI };
