import { HTMLAttributes, useRef, useState } from "react";
import SyntaxHighlighter, { createElement } from "react-syntax-highlighter";
import { IconButton } from "@/components";
import styled from "styled-components";
import useColorStyle from "./useColorStyle";
import { EmptyButton } from "../commonElement";

export type CodeThemeType = "light" | "dark";
interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  language?: string;
  children: string;
  theme?: CodeThemeType;
  showLineNumbers?: boolean;
  showWrapButton?: boolean;
  wrapLines?: boolean;
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
  width: stretch;
  position: relative;
  cursor: pointer;
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

const CodeButton = styled(EmptyButton)<{ $copied: boolean }>`
  ${({ $copied }) => `
    color: ${$copied ? "green" : "inherit"};
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
  style,
  showWrapButton = false,
  wrapLines = false,
  ...props
}: Props) => {
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(wrapLines);
  const customStyle = useColorStyle(theme);
  const ref = useRef<HTMLElement>(null);

  const copyCodeToClipboard = async () => {
    if (ref.current?.textContent) {
      await navigator.clipboard.writeText(ref.current.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const wrapElement = () => {
    setWrap(wrap => !wrap);
  };

  const CodeWithRef = (props: HTMLAttributes<HTMLElement>) => (
    <CodeContent
      {...props}
      ref={ref}
    />
  );
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
            icon="document"
            onClick={wrapElement}
          />
        )}
        <CodeButton
          as={IconButton}
          $copied={copied}
          icon={copied ? "check" : "copy"}
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
        customStyle={style}
        wrapLines={wrap || wrapLines}
        wrapLongLines={wrap || wrapLines}
      >
        {children}
      </Highlighter>
    </CodeBlockContainer>
  );
};
