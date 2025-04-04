import { StoryFn } from "@storybook/react";
import { FileUpload } from "@/components/FileUpload/FileUpload.tsx";

export default {
  component: FileUpload,
  title: "Forms/FileUpload",
  tags: ["file-upload", "autodocs"],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
    supportedFileTypes: {
      control: "array",
    },
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    showProgress: {
      control: "boolean",
    },
    showSuccess: {
      control: "boolean",
    },
    failureMessage: {
      control: "text",
    },
    onFileSelect: { action: "file selected" },
    onRetry: { action: "retry requested" },
  },
};

export const SmallSize = {
  args: {
    title: "Upload file",
    supportedFileTypes: [".txt", ".csv", ".json", ".sql"],
    size: "sm",
    progress: 75,
    showProgress: false,
    showSuccess: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileUpload` component in small size variant",
      },
    },
  },
};

export const MediumSize = {
  args: {
    title: "Upload file",
    supportedFileTypes: [".txt", ".csv", ".json", ".sql"],
    progress: 65,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileUpload` component in medium size variant",
      },
    },
  },
};
