import React, { HTMLAttributes, useState } from 'react';
import { Light as SyntaxHighlighter, createElement } from 'react-syntax-highlighter';

import { IconButton } from '@/components/IconButton';

import { cn } from '@/lib/cva';
import useColorStyle, {
  useButtonStateColors,
  useNumbersColor,
  useSqlColorStyle,
} from './useColorStyle';
import { CodeBlockProps } from './CodeBlock.types';
import { SQL_KIND_CLASS, SqlLine } from './sql/highlight';
import useClickHouseSql from './sql/useClickHouseSql';
import styles from './CodeBlock.module.css';

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

export const CodeBlock = ({
  children,
  language,
  theme,
  showLineNumbers,
  showWrapButton = false,
  wrapLines = false,
  onCopy,
  onCopyError,
  className,
  style,
  ...props
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [errorCopy, setErrorCopy] = useState(false);
  const [wrap, setWrap] = useState(wrapLines);
  const customStyle = useColorStyle(theme);
  const numbersColor = useNumbersColor(theme);
  const buttonStateColors = useButtonStateColors();
  // SQL is highlighted with ClickHouse's own lexer (compiled to WASM), exactly as the
  // ClickHouse Web UI does it. While the module instantiates — or when WebAssembly is
  // unavailable or the lexer rejects the text — this is null and the generic
  // highlight.js rendering below is used instead.
  const sqlLines = useClickHouseSql(children, language === 'sql');
  const sqlColorStyle = useSqlColorStyle(theme);

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      if (typeof onCopy == 'function') {
        onCopy(children);
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

  const CodeWithRef = (props: HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className={cn(styles['codeblock__content'], props.className)}
    />
  );

  // Render the ClickHouse-lexer highlighting with the same DOM the SyntaxHighlighter
  // path produces (pre > code > one span per line, with the same inline line-number
  // spans), so both paths look identical apart from the token colors.
  const renderSqlLines = (lines: SqlLine[]) => {
    const wrapped = wrap || wrapLines;
    const lineNumberStyle: React.CSSProperties = {
      display: 'inline-block',
      minWidth: `${String(lines.length).length}.25em`,
      paddingRight: '1em',
      textAlign: 'right',
      userSelect: 'none',
    };

    return (
      <pre
        className={styles['codeblock__highlighter']}
        style={customStyle.hljs}
      >
        <CodeWithRef
          className="language-sql"
          style={{ whiteSpace: wrapped ? 'pre-wrap' : 'pre' }}
        >
          {lines.map((line, lineIndex) => {
            const content = (
              <>
                {line.map((span, spanIndex) => (
                  <span
                    key={spanIndex}
                    className={span.kind ? SQL_KIND_CLASS[span.kind] : undefined}
                    style={
                      span.underline
                        ? {
                            ...sqlColorStyle[span.kind ?? 'number'],
                            textDecoration: 'underline',
                          }
                        : span.kind
                          ? sqlColorStyle[span.kind]
                          : undefined
                    }
                  >
                    {span.text}
                  </span>
                ))}
                {lineIndex < lines.length - 1 ? '\n' : null}
              </>
            );
            return (
              <span
                key={lineIndex}
                style={wrapped && showLineNumbers ? { display: 'flex' } : undefined}
              >
                {showLineNumbers && (
                  <span
                    className="comment linenumber react-syntax-highlighter-line-number"
                    style={lineNumberStyle}
                  >
                    {lineIndex + 1}
                  </span>
                )}
                {showLineNumbers ? <span>{content}</span> : content}
              </span>
            );
          })}
        </CodeWithRef>
      </pre>
    );
  };
  return (
    <div
      {...props}
      style={{ '--codeblock-numbers': numbersColor, ...style } as React.CSSProperties}
      className={cn(styles.codeblock, className)}
    >
      <div className={styles['codeblock__button-container']}>
        {showWrapButton && (
          <IconButton
            className={styles['codeblock__button']}
            icon="document"
            onClick={wrapElement}
          />
        )}
        <IconButton
          className={styles['codeblock__button']}
          style={
            {
              '--codeblock-button': copied
                ? buttonStateColors.success
                : errorCopy
                  ? buttonStateColors.danger
                  : undefined,
            } as React.CSSProperties
          }
          icon={copied ? 'check' : errorCopy ? 'warning' : 'copy'}
          onClick={copyCodeToClipboard}
        />
      </div>
      {sqlLines ? (
        renderSqlLines(sqlLines)
      ) : (
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          CodeTag={CodeWithRef}
          className={styles['codeblock__highlighter']}
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
          {children}
        </SyntaxHighlighter>
      )}
    </div>
  );
};
