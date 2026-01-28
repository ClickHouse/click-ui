import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { ThemeName, themes } from '.';
import { isValidThemeName } from '@/utils/theme';

const GlobalStyle = createGlobalStyle`
  body{
    color: ${props => props.theme.click.global.color.text.default};
    background-color: ${props => props.theme.click.global.color.background.default}
  }
`;

const ThemeProvider = ({
  theme: name,
  children,
}: {
  theme: ThemeName;
  children: React.ReactNode;
}) => {
  const hasValidTheme = isValidThemeName(name);
  const resolvedTheme = !hasValidTheme ? 'light' : name;
  return (
    <StyledThemeProvider theme={themes[resolvedTheme]}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export { ThemeProvider };
