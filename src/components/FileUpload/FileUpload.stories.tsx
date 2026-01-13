import { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload } from "@/components/FileUpload/FileUpload.tsx";

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: "Forms/FileUpload",
  tags: ["file-upload", "autodocs"],
  decorators: [
    Story => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Small</h4>
            <FileUpload
              title="Upload file"
              supportedFileTypes={[".txt", ".csv"]}
              size="sm"
              onFileSelect={file => console.log("File selected:", file)}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Medium</h4>
            <FileUpload
              title="Upload file"
              supportedFileTypes={[".txt", ".csv"]}
              size="md"
              onFileSelect={file => console.log("File selected:", file)}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>File Upload States (Simulated)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Empty State</h4>
            <FileUpload
              title="Drag and drop file here"
              supportedFileTypes={[".txt", ".csv", ".json"]}
              size="md"
              onFileSelect={file => console.log("File selected:", file)}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Supported File Types</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Text Files</h4>
            <FileUpload
              title="Upload text files"
              supportedFileTypes={[".txt", ".md"]}
              size="sm"
              onFileSelect={file => console.log("File selected:", file)}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Data Files</h4>
            <FileUpload
              title="Upload data files"
              supportedFileTypes={[".csv", ".json", ".xml"]}
              size="sm"
              onFileSelect={file => console.log("File selected:", file)}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              SQL Files Only
            </h4>
            <FileUpload
              title="Upload SQL files"
              supportedFileTypes={[".sql"]}
              size="sm"
              onFileSelect={file => console.log("File selected:", file)}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Custom Titles</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Custom Title 1
            </h4>
            <FileUpload
              title="Drop your document here"
              supportedFileTypes={[".pdf", ".doc", ".docx"]}
              size="md"
              onFileSelect={file => console.log("File selected:", file)}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Custom Title 2
            </h4>
            <FileUpload
              title="Import your data"
              supportedFileTypes={[".csv", ".xlsx"]}
              size="md"
              onFileSelect={file => console.log("File selected:", file)}
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
      hover: [".cuiUploadArea"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
