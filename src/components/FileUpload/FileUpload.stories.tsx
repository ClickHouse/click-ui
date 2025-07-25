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
    onFileFailure: { action: "operation failed" },
    onFileClose: { action: "operation dismissed" },
  },
};

export const SmallSize = {
  args: {
    title: "Upload file",
    supportedFileTypes: [".txt", ".csv"],
    size: "sm",
    progress: 75,
    showProgress: false,
    showSuccess: false,
    onRetry: () => console.log("File retried"),
    onFileFailure: () => console.log("File failed"),
    onFileClose: () => console.log("File dismissed"),
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
    onRetry: () => console.log("File retried"),
    onFileFailure: () => console.log("File failed"),
    onFileClose: () => console.log("File dismissed"),
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileUpload` component in medium size variant",
      },
    },
  },
};


export const RestrictedFileTypes = {
  args: {
    title: "Upload SQL files only",
    supportedFileTypes: [".sql"],
    size: "md",
    onRetry: () => console.log("File retried"),
    onFileFailure: () => console.log("File failed - unsupported type"),
    onFileClose: () => console.log("File dismissed"),
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileUpload` component with restricted file types. Try dropping or selecting a non-SQL file to see the 'Unsupported file type' message.",
      },
    },
  },
};
