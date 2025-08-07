import { HTMLAttributes, useState } from "react";
import { Light as SyntaxHighlighter, createElement } from "react-syntax-highlighter";
import { IconButton } from "@/components";
import { styled } from "styled-components";
import useColorStyle from "./useColorStyle";
import { EmptyButton } from "../commonElement";
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

const CodeBlockContainer = styled.div<{ $theme?: CodeThemeType }>`
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  position: relative;
  ${({ theme, $theme }) => {
    const themeName = (theme.name !== "classic" ? theme.name : "light") as CodeThemeType;

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
          : "inherit"
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
}: Props) => {
  const [copied, setCopied] = useState(false);
  const [errorCopy, setErrorCopy] = useState(false);
  const [wrap, setWrap] = useState(wrapLines);
  const customStyle = useColorStyle(theme);

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
          icon={copied ? "check" : errorCopy ? "warning" : "copy"}
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
      </Highlighter>
    </CodeBlockContainer>
  );
};
