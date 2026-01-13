import { Meta, StoryObj, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import {
  FileMultiUpload,
  FileUploadItem,
} from "@/components/FileUpload/FileMultiUpload.tsx";

const meta: Meta<typeof FileMultiUpload> = {
  component: FileMultiUpload,
  title: "Forms/FileMultiUpload",
  tags: ["file-upload", "multi-upload", "autodocs"],
  decorators: [
    Story => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FileMultiUpload>;

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

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Empty State</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FileMultiUpload
            title="Upload multiple files"
            supportedFileTypes={[".txt", ".csv", ".json", ".sql"]}
            files={[]}
            onFileSelect={file => console.log("File selected:", file)}
            onFileRetry={fileId => console.log("Retry file:", fileId)}
            onFileRemove={fileId => console.log("Remove file:", fileId)}
          />
        </div>
      </section>

      <section>
        <h3>With Uploading Files</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FileMultiUpload
            title="Upload multiple files"
            supportedFileTypes={[".txt", ".csv", ".json", ".sql"]}
            files={[
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
            ]}
            onFileSelect={file => console.log("File selected:", file)}
            onFileRetry={fileId => console.log("Retry file:", fileId)}
            onFileRemove={fileId => console.log("Remove file:", fileId)}
          />
        </div>
      </section>

      <section>
        <h3>With Success Files</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FileMultiUpload
            title="Upload multiple files"
            supportedFileTypes={[".txt", ".csv", ".json", ".sql"]}
            files={[
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
            ]}
            onFileSelect={file => console.log("File selected:", file)}
            onFileRetry={fileId => console.log("Retry file:", fileId)}
            onFileRemove={fileId => console.log("Remove file:", fileId)}
          />
        </div>
      </section>

      <section>
        <h3>With Error Files</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FileMultiUpload
            title="Upload multiple files"
            supportedFileTypes={[".txt", ".csv", ".json", ".sql"]}
            files={[
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
            ]}
            onFileSelect={file => console.log("File selected:", file)}
            onFileRetry={fileId => console.log("Retry file:", fileId)}
            onFileRemove={fileId => console.log("Remove file:", fileId)}
          />
        </div>
      </section>

      <section>
        <h3>Mixed States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FileMultiUpload
            title="Upload multiple files"
            supportedFileTypes={[".txt", ".csv", ".json", ".sql"]}
            files={[
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
            ]}
            onFileSelect={file => console.log("File selected:", file)}
            onFileRetry={fileId => console.log("Retry file:", fileId)}
            onFileRemove={fileId => console.log("Remove file:", fileId)}
          />
        </div>
      </section>

      <section>
        <h3>Supported File Types Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Text Files Only
            </h4>
            <FileMultiUpload
              title="Upload text files"
              supportedFileTypes={[".txt", ".md"]}
              files={[]}
              onFileSelect={file => console.log("File selected:", file)}
              onFileRetry={fileId => console.log("Retry file:", fileId)}
              onFileRemove={fileId => console.log("Remove file:", fileId)}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Data Files Only
            </h4>
            <FileMultiUpload
              title="Upload data files"
              supportedFileTypes={[".csv", ".json", ".xml"]}
              files={[]}
              onFileSelect={file => console.log("File selected:", file)}
              onFileRetry={fileId => console.log("Retry file:", fileId)}
              onFileRemove={fileId => console.log("Remove file:", fileId)}
            />
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiUploadArea", ".cuiFileItem"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
