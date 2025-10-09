"use client";

import { HTMLAttributes, useState } from "react";
import { Light as SyntaxHighlighter, createElement } from "react-syntax-highlighter";
import clsx from "clsx";
import { IconButton } from "@/components";
import { EmptyButton } from "@/components/commonElement";
import useColorStyle from "./useColorStyle";
import styles from "./CodeBlock.module.scss";
import sql from "react-syntax-highlighter/dist/cjs/languages/hljs/sql";
import bash from "react-syntax-highlighter/dist/cjs/languages/hljs/bash";
import json from "react-syntax-highlighter/dist/cjs/languages/hljs/json";
import tsx from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";

SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("tsx", tsx);

export type CodeThemeType = "light" | "dark";
interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onCopy"> {
  language?: string;
  children: string;
  theme?: CodeThemeType;
  showLineNumbers?: boolean;
  showWrapButton?: boolean;
  wrapLines?: boolean;
  onCopy?: (value: string) => void | Promise<void>;
  onCopyError?: (error: string) => void | Promise<void>;
}

interface RendererNodeType {
  type: "element" | "text";
  value?: string | number | undefined;
  tagName?: keyof JSX.IntrinsicElements | React.ComponentType | undefined;
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
  ...props
}: Props) => {
  const [copied, setCopied] = useState(false);
  const [errorCopy, setErrorCopy] = useState(false);
  const [wrap, setWrap] = useState(wrapLines);

  const themeMode = theme ?? "light";
  const customStyle = useColorStyle(themeMode);

  // Get theme-specific class name
  const getThemeClassName = (theme: CodeThemeType): string => {
    return styles[`cui${theme.charAt(0).toUpperCase() + theme.slice(1)}Mode`];
  };

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      if (typeof onCopy == "function") {
        onCopy(children);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      let message = "Unable to copy code";
      if (error instanceof Error) message = error.message;
      setErrorCopy(true);
      if (typeof onCopyError === "function") {
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
      className={styles.cuiCodeContent}
    />
  );

  return (
    <div
      className={clsx(
        styles.cuiCodeBlockContainer,
        getThemeClassName(themeMode),
        className
      )}
      {...props}
    >
      <div className={styles.cuiButtonContainer}>
        {showWrapButton && (
          <EmptyButton
            className={clsx(styles.cuiCodeButton, styles.cuiNormal)}
            onClick={wrapElement}
          >
            <IconButton icon="document" />
          </EmptyButton>
        )}
        <EmptyButton
          className={clsx(styles.cuiCodeButton, {
            [styles.cuiCopied]: copied,
            [styles.cuiError]: errorCopy,
            [styles.cuiNormal]: !copied && !errorCopy,
          })}
          onClick={copyCodeToClipboard}
        >
          <IconButton icon={copied ? "check" : errorCopy ? "warning" : "copy"} />
        </EmptyButton>
      </div>
      <SyntaxHighlighter
        language={language}
        style={customStyle as { [key: string]: React.CSSProperties }}
        CodeTag={CodeWithRef}
        className={styles.cuiHighlighter}
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
                  tagName: "span",
                  type: "element",
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
    </div>
  );
};
