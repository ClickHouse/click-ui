import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { ThemeName, themes } from ".";

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
}) => (
  <StyledThemeProvider theme={{ name, ...themes[name] }}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);

export { ThemeProvider };
