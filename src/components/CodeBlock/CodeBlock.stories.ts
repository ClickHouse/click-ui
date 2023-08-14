import { CodeBlock } from "./CodeBlock";

export default {
  title: "CodeBlocks/CodeBlock",
  component: CodeBlock,
  tags: ["code-blocks", "code-block", "autodocs"],
};

export const Playground = {
  args: {
    children: "curl https://clickhouse.com/ | sh",
    language: "bash",
  },
};
