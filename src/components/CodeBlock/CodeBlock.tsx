import React, { HTMLAttributes, useState } from 'react';
import { Light as SyntaxHighlighter, createElement } from 'react-syntax-highlighter';

import { IconButton } from '@/components/IconButton';

import { cn } from '@/lib/cva';
import useColorStyle, { useButtonStateColors, useNumbersColor } from './useColorStyle';
import { CodeBlockProps } from './CodeBlock.types';
import styles from './CodeBlock.module.css';

/* eslint-disable import/extensions */
// @ts-expect-error - The types declare these paths without the .js extension that ESM resolution needs
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql.js';
// @ts-expect-error - The types declare these paths without the .js extension that ESM resolution needs
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash.js';
// @ts-expect-error - The types declare these paths without the .js extension that ESM resolution needs
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json.js';
// @ts-expect-error - The types declare these paths without the .js extension that ESM resolution needs
import tsx from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript.js';
// @ts-expect-error - The types declare these paths without the .js extension that ESM resolution needs
import plaintext from 'react-syntax-highlighter/dist/esm/languages/hljs/plaintext.js';
// @ts-expect-error - The types declare these paths without the .js extension that ESM resolution needs
import diff from 'react-syntax-highlighter/dist/esm/languages/hljs/diff.js';
/* eslint-enable import/extensions */

SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('plaintext', plaintext);
SyntaxHighlighter.registerLanguage('diff', diff);

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
  ariaLabel,
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

  const codeRegionLabel =
    ariaLabel ?? (language ? `${language} code block` : 'Code block');

  const wrapElement = () => {
    setWrap(wrap => !wrap);
  };

  const CodeWithRef = (props: HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className={cn(styles['codeblock__content'], props.className)}
    />
  );
  return (
    <div
      {...props}
      style={{ '--codeblock-numbers': numbersColor, ...style } as React.CSSProperties}
      className={cn(styles.codeblock, className)}
    >
      <SyntaxHighlighter
        tabIndex={0}
        role="group"
        aria-label={codeRegionLabel}
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
    </div>
  );
};
