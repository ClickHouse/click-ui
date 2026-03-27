import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { Light as SyntaxHighlighter, createElement } from 'react-syntax-highlighter';
import { EmptyButton } from '@/components/EmptyButton';
import { IconButton } from '@/components/IconButton';
import { styled } from 'styled-components';
import useColorStyle from './useColorStyle';
import { CodeBlockProps, CodeThemeType } from './CodeBlock.types';

/* eslint-disable import/extensions */
// @ts-expect-error - Importing CJS modules in ESM context requires explicit .js extension
import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql.js';
// @ts-expect-error - Importing CJS modules in ESM context requires explicit .js extension
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash.js';
// @ts-expect-error - Importing CJS modules in ESM context requires explicit .js extension
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json.js';
// @ts-expect-error - Importing CJS modules in ESM context requires explicit .js extension
import tsx from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript.js';
// @ts-expect-error - Importing CJS modules in ESM context requires explicit .js extension
import plaintext from 'react-syntax-highlighter/dist/cjs/languages/hljs/plaintext.js';
/* eslint-enable import/extensions */

const nodeToString = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') { return ''; }
  if (typeof node === 'string') { return node; }
  if (typeof node === 'number') { return String(node); }
  if (Array.isArray(node)) { return node.map(nodeToString).join(''); }
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    const tagName = typeof element.type === 'string' ? element.type : '';
    const children = element.props.children;
    if (children !== undefined && children !== null) {
      return `<${tagName}>${nodeToString(children)}</${tagName}>`;
    }
    return `<${tagName}>`;
  }
  return String(node);
};

SyntaxHighlighter.registerLanguage('sql', sql.default || sql);
SyntaxHighlighter.registerLanguage('bash', bash.default || bash);
SyntaxHighlighter.registerLanguage('json', json.default || json);
SyntaxHighlighter.registerLanguage('tsx', tsx.default || tsx);
SyntaxHighlighter.registerLanguage('plaintext', plaintext.default || plaintext);

interface RendererNodeType {
  type: 'element' | 'text';
  value?: string | number | undefined;
  tagName?: keyof React.JSX.IntrinsicElements | React.ComponentType | undefined;
  properties?: { className: unknown[]; [key: string]: unknown };
  children?: RendererNodeType[];
}
interface CustomRendererProps {
  rows: RendererNodeType[];
  stylesheet: { [key: string]: React.CSSProperties };
  useInlineStyles: boolean;
}

const CodeBlockContainer = styled.div<{ $theme?: CodeThemeType }>`
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  position: relative;
  ${({ theme, $theme }) => {
    const themeName = theme.name as CodeThemeType;

    const codeTheme = theme.click.codeblock[`${!$theme ? themeName : $theme}Mode`].color;
    return `
    color: ${codeTheme.numbers.default};
    .linenumber {
      color: ${codeTheme.numbers.default}
    }
  `;
  }}
`;

const CodeButton = styled(EmptyButton)<{ $copied: boolean; $error: boolean }>`
  ${({ $copied, $error, theme }) => `
    color: ${
      $copied
        ? theme.click.alert.color.text.success
        : $error
          ? theme.click.alert.color.text.danger
          : 'inherit'
    };
    padding: 0;
    border: 0;
  `}
`;

const Highlighter = styled(SyntaxHighlighter)`
  background: transparent;
  padding: 0;
  margin: 0;
`;

const CodeContent = styled.code`
  font-family: inherit;
  color: inherit;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  ${({ theme }) => `
    gap:  0.625rem;
    top: ${theme.click.codeblock.space.y};
    right: ${theme.click.codeblock.space.x};
  `}
`;

export const CodeBlock = ({
  children,
  language,
  theme,
  showLineNumbers,
  showWrapButton = false,
  wrapLines = false,
  onCopy,
  onCopyError,
  ...props
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [errorCopy, setErrorCopy] = useState(false);
  const [wrap, setWrap] = useState(wrapLines);
  const customStyle = useColorStyle(theme);
  const codeString = nodeToString(children);

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      if (typeof onCopy == 'function') {
        onCopy(codeString);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      let message = 'Unable to copy code';
      if (error instanceof Error) {
        message = error.message;
      }
      setErrorCopy(true);
      if (typeof onCopyError === 'function') {
        onCopyError(message);
      }
      setTimeout(() => setErrorCopy(false), 2000);
    }
  };
  const wrapElement = () => {
    setWrap(wrap => !wrap);
  };

  const CodeWithRef = (props: HTMLAttributes<HTMLElement>) => <CodeContent {...props} />;
  return (
    <CodeBlockContainer
      $theme={theme}
      {...props}
    >
      <ButtonContainer>
        {showWrapButton && (
          <CodeButton
            as={IconButton}
            $copied={false}
            $error={false}
            icon="document"
            onClick={wrapElement}
          />
        )}
        <CodeButton
          as={IconButton}
          $copied={copied}
          $error={errorCopy}
          icon={copied ? 'check' : errorCopy ? 'warning' : 'copy'}
          onClick={copyCodeToClipboard}
        />
      </ButtonContainer>
      <Highlighter
        language={language}
        style={customStyle}
        CodeTag={CodeWithRef}
        renderer={({ rows, stylesheet, useInlineStyles }: CustomRendererProps) => {
          return rows.map((row, index) => {
            const children = row.children;
            const lineNumberElement = children?.shift();

            /**
             * We will take current structure of the rows and rebuild it
             * according to the suggestion here https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/376#issuecomment-1246115899
             */
            if (lineNumberElement) {
              row.children = [
                lineNumberElement,
                {
                  children,
                  properties: {
                    className: [],
                  },
                  tagName: 'span',
                  type: 'element',
                },
              ];
            }

            return createElement({
              node: row,
              stylesheet,
              useInlineStyles,
              key: index,
            });
          });
        }}
        showLineNumbers={showLineNumbers}
        wrapLines={wrap || wrapLines}
        wrapLongLines={wrap || wrapLines}
      >
        {codeString}
      </Highlighter>
    </CodeBlockContainer>
  );
};
