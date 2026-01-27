import { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload, type FileUploadProps } from "@/components/FileUpload/FileUpload";
import { Flyout } from "@/components/Flyout/Flyout";
import { Button } from "@/components/Button/Button";
import { useState } from "react";

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

export const SmallSize: Story = {
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

export const MediumSize: Story = {
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

export const RestrictedFileTypes: Story = {
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
        story:
          "Shows the `FileUpload` component with restricted file types. Try dropping or selecting a non-SQL file to see the 'Unsupported file type' message.",
      },
    },
  },
};

export const InsideFlyout: StoryObj<FileUploadProps> = {
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          type="secondary"
          onClick={() => setOpen(true)}
        >
          Open Flyout
        </Button>

        <Flyout
          open={open}
          onOpenChange={setOpen}
        >
          <Flyout.Content
            strategy="fixed"
            size="default"
            closeOnInteractOutside={true}
          >
            <Flyout.Header
              title="Flyout"
              description="The following showcases the upload file  in a flyout"
            />
            <Flyout.Body>
              <Flyout.Element>
                <FileUpload {...args} />
              </Flyout.Element>
            </Flyout.Body>
            <Flyout.Footer>
              <Flyout.Close label="Cancel" />
              <Button>Confirm</Button>
            </Flyout.Footer>
          </Flyout.Content>
        </Flyout>
      </>
    );
  },
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
        story: "Shows the `FileUpload` component nested within a `Flyout`",
      },
    },
  },
};
