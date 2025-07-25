import { StoryFn } from "@storybook/react";
import { useState } from "react";
import {
  FileMultiUpload,
  FileUploadItem,
} from "@/components/FileUpload/FileMultiUpload.tsx";

export default {
  component: FileMultiUpload,
  title: "Forms/FileMultiUpload",
  tags: ["file-upload", "multi-upload", "autodocs"],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    supportedFileTypes: {
      control: "array",
    },
    onFileSelect: { action: "file selected" },
    onFileRetry: { action: "retry requested" },
    onFileRemove: { action: "file removed" },
  },
};

export const EmptyState = {
  args: {
    title: "Upload multiple files",
    supportedFileTypes: [".txt", ".csv", ".json", ".sql"],
    files: [],
    onFileSelect: (file: File) => console.log("File selected:", file.name),
    onFileRetry: (fileId: string) => console.log("Retry file:", fileId),
    onFileRemove: (fileId: string) => console.log("Remove file:", fileId),
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileMultiUpload` component with no files uploaded",
      },
    },
  },
};

export const WithUploadingFiles = {
  args: {
    title: "Upload multiple files",
    supportedFileTypes: [".txt", ".csv", ".json", ".sql"],
    files: [
      {
        id: "1",
        name: "document1.txt",
        size: 1024,
        status: "uploading" as const,
        progress: 45,
      },
      {
        id: "2",
        name: "spreadsheet.csv",
        size: 2048,
        status: "uploading" as const,
        progress: 75,
      },
    ],
    onFileSelect: (file: File) => console.log("File selected:", file.name),
    onFileRetry: (fileId: string) => console.log("Retry file:", fileId),
    onFileRemove: (fileId: string) => console.log("Remove file:", fileId),
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileMultiUpload` component with files currently uploading",
      },
    },
  },
};

export const WithSuccessFiles = {
  args: {
    title: "Upload multiple files",
    supportedFileTypes: [".txt", ".csv", ".json", ".sql"],
    files: [
      {
        id: "1",
        name: "document1.txt",
        size: 1024,
        status: "success" as const,
        progress: 100,
      },
      {
        id: "2",
        name: "spreadsheet.csv",
        size: 2048,
        status: "success" as const,
        progress: 100,
      },
      {
        id: "3",
        name: "config.json",
        size: 512,
        status: "success" as const,
        progress: 100,
      },
    ],
    onFileSelect: (file: File) => console.log("File selected:", file.name),
    onFileRetry: (fileId: string) => console.log("Retry file:", fileId),
    onFileRemove: (fileId: string) => console.log("Remove file:", fileId),
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileMultiUpload` component with successfully uploaded files",
      },
    },
  },
};

export const WithErrorFiles = {
  args: {
    title: "Upload multiple files",
    supportedFileTypes: [".txt", ".csv", ".json", ".sql"],
    files: [
      {
        id: "1",
        name: "document1.txt",
        size: 1024,
        status: "error" as const,
        progress: 0,
        errorMessage: "Upload failed",
      },
      {
        id: "2",
        name: "large-file.csv",
        size: 5242880,
        status: "error" as const,
        progress: 0,
        errorMessage: "File too large",
      },
    ],
    onFileSelect: (file: File) => console.log("File selected:", file.name),
    onFileRetry: (fileId: string) => console.log("Retry file:", fileId),
    onFileRemove: (fileId: string) => console.log("Remove file:", fileId),
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileMultiUpload` component with files that failed to upload",
      },
    },
  },
};

export const MixedStates = {
  args: {
    title: "Upload multiple files",
    supportedFileTypes: [".txt", ".csv", ".json", ".sql"],
    files: [
      {
        id: "1",
        name: "document1.txt",
        size: 1024,
        status: "success" as const,
        progress: 100,
      },
      {
        id: "2",
        name: "uploading-file.csv",
        size: 2048,
        status: "uploading" as const,
        progress: 65,
      },
      {
        id: "3",
        name: "failed-file.json",
        size: 512,
        status: "error" as const,
        progress: 0,
        errorMessage: "Network error",
      },
      {
        id: "4",
        name: "another-success.sql",
        size: 1536,
        status: "success" as const,
        progress: 100,
      },
    ],
    onFileSelect: (file: File) => console.log("File selected:", file.name),
    onFileRetry: (fileId: string) => console.log("Retry file:", fileId),
    onFileRemove: (fileId: string) => console.log("Remove file:", fileId),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the `FileMultiUpload` component with files in various states (success, uploading, error)",
      },
    },
  },
};

// Interactive example that demonstrates state management
export const Interactive: StoryFn = () => {
  const [files, setFiles] = useState<FileUploadItem[]>([]);

  const handleFileSelect = (file: File) => {
    const newFile: FileUploadItem = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
    };

    setFiles(prev => [...prev, newFile]);

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles(prev =>
        prev.map(f => {
          if (f.id === newFile.id && f.status === "uploading") {
            const newProgress = Math.min(f.progress + 10, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress === 100 ? "success" : "uploading",
            };
          }
          return f;
        })
      );
    }, 200);

    setTimeout(() => clearInterval(interval), 2000);
  };

  const handleFileRetry = (fileId: string) => {
    setFiles(prev =>
      prev.map(f => (f.id === fileId ? { ...f, status: "uploading", progress: 0 } : f))
    );

    // Simulate retry with potential failure
    setTimeout(() => {
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: Math.random() > 0.5 ? "success" : "error",
                progress: Math.random() > 0.5 ? 100 : 0,
                errorMessage: Math.random() > 0.5 ? undefined : "Retry failed",
              }
            : f
        )
      );
    }, 1000);
  };

  const handleFileRemove = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <FileMultiUpload
      title="Upload multiple files"
      supportedFileTypes={[".txt", ".csv", ".json", ".sql"]}
      files={files}
      onFileSelect={handleFileSelect}
      onFileRetry={handleFileRetry}
      onFileRemove={handleFileRemove}
    />
  );
};

Interactive.parameters = {
  docs: {
    description: {
      story:
        "Interactive example that simulates file upload behavior with progress and state management",
    },
  },
};
