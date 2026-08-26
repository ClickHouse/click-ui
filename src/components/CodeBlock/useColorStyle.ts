import type { CSSProperties } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { CodeThemeType } from './CodeBlock.types';
import { SqlTokenKind } from './sql/highlight';

const useColorStyle = (defaultTheme?: CodeThemeType): Record<string, CSSProperties> => {
  const theme = useTheme();
  const inheritedThemeName = theme.name as CodeThemeType;
  const themeName = !defaultTheme ? inheritedThemeName : defaultTheme;
  const codeTheme = theme.click.codeblock[`${themeName}Mode`].color;

  return {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: `${theme.click.codeblock.space.y} ${theme.click.codeblock.space.x}`,
      color: codeTheme.text.default,
      background: codeTheme.background.default,
      borderRadius: theme.click.codeblock.radii.all,
      font: theme.click.codeblock.typography.text.default,
    },
    'hljs-comment': {
      color: themeName === 'dark' ? '#999999' : '#656e77',
    },
    'hljs-keyword': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-selector-tag': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-meta-keyword': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-doctag': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-section': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-selector-class': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-meta': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-selector-pseudo': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-attr': {
      color: themeName === 'dark' ? '#88aece' : '#015692',
    },
    'hljs-attribute': {
      color: themeName === 'dark' ? '#c59bc1' : '#803378',
    },
    'hljs-name': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-type': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-number': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-selector-id': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-quote': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-template-tag': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-built_in': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-title': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-literal': {
      color: themeName === 'dark' ? '#f08d49' : '#b75501',
    },
    'hljs-string': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-regexp': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-symbol': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-variable': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-template-variable': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-link': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-selector-attr': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-meta-string': {
      color: themeName === 'dark' ? '#b5bd68' : '#54790d',
    },
    'hljs-bullet': {
      color: themeName === 'dark' ? '#cccccc' : '#535a60',
    },
    'hljs-code': {
      color: themeName === 'dark' ? '#cccccc' : '#535a60',
    },
    'hljs-deletion': {
      color: themeName === 'dark' ? '#de7176' : '#c02d2e',
    },
    'hljs-addition': {
      color: themeName === 'dark' ? '#76c490' : '#2f6f44',
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
  };
};

// Colors for the ClickHouse-lexer SQL highlighting, copied verbatim from the ClickHouse
// Web UI (programs/server/play.html), which itself mirrors `clickhouse-client`: the
// light values are darker variants of the terminal palette so they read well on a light
// background; the dark values are the actual xterm 16-color values `clickhouse-client`
// renders to in a dark terminal. Keywords and operators render in the default text
// color (keywords in bold), and brackets cycle through seven colors by nesting depth.
const sqlPalettes: Record<CodeThemeType, Record<SqlTokenKind, CSSProperties>> = {
  light: {
    keyword: { fontWeight: 'bold' },
    identifier: { color: '#00838F' },
    function: { color: '#875F00' },
    number: { color: '#008700' },
    string: { color: '#006400' },
    quotedIdentifier: { color: '#008B8B' },
    comment: { color: '#757575', fontStyle: 'italic' },
    operator: {},
    error: { color: '#B71C1C', textDecoration: 'underline wavy' },
    bracket0: { color: '#A31515' },
    bracket1: { color: '#8A4B00' },
    bracket2: { color: '#6B5D00' },
    bracket3: { color: '#1B5E3A' },
    bracket4: { color: '#0D3C8C' },
    bracket5: { color: '#4A2A85' },
    bracket6: { color: '#8A0F42' },
  },
  dark: {
    keyword: { fontWeight: 'bold' },
    identifier: { color: '#00CDCD' },
    function: { color: '#CDCD00' },
    number: { color: '#00D700' },
    string: { color: '#00CD00' },
    quotedIdentifier: { color: '#00D7D7' },
    comment: { color: '#9E9E9E', fontStyle: 'italic' },
    operator: {},
    error: { color: '#FF6E40', textDecoration: 'underline wavy' },
    bracket0: { color: '#FF9999' },
    bracket1: { color: '#FFD3A6' },
    bracket2: { color: '#F7FCC0' },
    bracket3: { color: '#9BFAB8' },
    bracket4: { color: '#BFF3FF' },
    bracket5: { color: '#D7C4FC' },
    bracket6: { color: '#FFB0DE' },
  },
};

export const useSqlColorStyle = (
  defaultTheme?: CodeThemeType
): Record<SqlTokenKind, CSSProperties> => {
  const theme = useTheme();
  const inheritedThemeName = theme.name as CodeThemeType;
  const themeName = !defaultTheme ? inheritedThemeName : defaultTheme;
  return sqlPalettes[themeName];
};

export const useNumbersColor = (defaultTheme?: CodeThemeType): string => {
  const theme = useTheme();
  const inheritedThemeName = theme.name as CodeThemeType;
  const themeName = !defaultTheme ? inheritedThemeName : defaultTheme;
  return theme.click.codeblock[`${themeName}Mode`].color.numbers.default;
};

export const useButtonStateColors = (): { success: string; danger: string } => {
  const theme = useTheme();
  return {
    success: theme.click.alert.color.text.success,
    danger: theme.click.alert.color.text.danger,
  };
};

export default useColorStyle;
