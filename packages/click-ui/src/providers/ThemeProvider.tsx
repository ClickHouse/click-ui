import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import {
  THEMES,
  themes,
  isValidThemeName,
} from '@clickhouse/design-tokens/legacy/theme';
import type { ThemeName } from '@clickhouse/design-tokens/legacy/theme';

const GlobalStyle = createGlobalStyle`
  body{
    color: ${props => props.theme.click.global.color.text.default};
    background-color: ${props => props.theme.click.global.color.background.default}
  }
`;

export const ThemeProvider = ({
  theme: name,
  children,
}: {
  theme: ThemeName;
  children: React.ReactNode;
}) => {
  const hasValidTheme = isValidThemeName(name);
  const resolvedTheme = !hasValidTheme ? THEMES.Light : name;
  return (
    <StyledThemeProvider theme={themes[resolvedTheme]}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
