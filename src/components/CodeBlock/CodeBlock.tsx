import { HTMLAttributes, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { IconButton } from "..";
import styled from "styled-components";
import useColorStyle from "./useColorStyle";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  language?: string;
  children: string;
  theme?: "light" | "dark";
}

const CodeBlockContainer = styled.div<{ $color: string }>`
  width: stretch;
  position: relative;
  ${({ $color }) => `
    color: ${$color};
  `}
`;

const CopyButton = styled(IconButton)<{ $copied: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  ${({ theme, $copied }) => `
    border-radius: ${theme.click.button.iconButton.radii.all};
    color: ${$copied ? "green" : "inherit"};
    padding: 0;
    margin-top: ${theme.click.codeblock.space.y};
    margin-right: ${theme.click.codeblock.space.x};
    border: 0;
  `}
`;

const Highlighter = styled(SyntaxHighlighter)`
  background: transparent;
  padding: 0;
  margin: 0;
`;

export const CodeBlock = ({ children, language, theme, ...props }: Props) => {
  const [copied, setCopied] = useState(false);
  const customStyle = useColorStyle(theme);
  const ref = useRef<HTMLElement>(null);

  const copyCodeToClipboard = async () => {
    if (ref.current?.textContent) {
      await navigator.clipboard.writeText(ref.current.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const CodeWithRef = (props: HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      ref={ref}
    />
  );
  return (
    <CodeBlockContainer
      $color={customStyle.hljs.color}
      {...props}
    >
      <CopyButton
        $copied={copied}
        icon={copied ? "check" : "copy"}
        onClick={copyCodeToClipboard}
      />
      <Highlighter
        language={language}
        style={customStyle}
        CodeTag={CodeWithRef}
      >
        {children}
      </Highlighter>
    </CodeBlockContainer>
  );
};
