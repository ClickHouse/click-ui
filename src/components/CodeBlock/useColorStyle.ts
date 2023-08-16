import { useTheme } from "styled-components";
import stackoverflowDark from "react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-dark";
import stackoverflowLight from "react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-light";
import { CodeThemeType } from "./CodeBlock";

const useColorStyle = (defaultTheme?: CodeThemeType) => {
  const theme = useTheme();
  const inheritedThemeName = (
    theme.name !== "classic" ? theme.name : "light"
  ) as CodeThemeType;
  const themeName = !defaultTheme ? inheritedThemeName : defaultTheme;
  const codeTheme = theme.click.codeblock[`${themeName}Mode`].color;

  const stackOverflowTheme =
    themeName === "light" ? stackoverflowLight : stackoverflowDark;
  stackOverflowTheme.hljs = {
    display: "block",
    overflowX: "auto",
    padding: `${theme.click.codeblock.space.y} ${theme.click.codeblock.space.x}`,
    color: codeTheme.text.default,
    background: codeTheme.background.default,
    borderRadius: theme.click.codeblock.radii.all,
    font: theme.click.codeblock.typography.text.default,
  };
  return stackOverflowTheme;
};

export default useColorStyle;
