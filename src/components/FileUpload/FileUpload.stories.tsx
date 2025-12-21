import { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload, type FileUploadProps } from "@/components/FileUpload/FileUpload.tsx";
import styled from "styled-components";
import { Flyout, type FlyoutRevealAnimation } from '@/components/Flyout/Flyout';
import { Button } from "@/components/Button/Button";
import { useState } from 'react';

const Wrapper = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
`;

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: "Forms/FileUpload",
  tags: ["file-upload", "autodocs"],
  decorators: [
    Story => (
      <Wrapper>
        <Story />
      </Wrapper>
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

type InsideFlyoutArgs = FileUploadProps & {
  revealAnimation: FlyoutRevealAnimation
};

export const InsideFlyout: StoryObj<InsideFlyoutArgs> = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button type="secondary" onClick={() => setOpen(true)}>Open Flyout</Button>

        <Flyout open={open} onOpenChange={setOpen}>
          <Flyout.Content
            strategy="fixed"
            size="default"
            closeOnInteractOutside={true}
            revealAnimation={args.revealAnimation}
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
    revealAnimation: "fade",
    onRetry: () => console.log("File retried"),
    onFileFailure: () => console.log("File failed"),
    onFileClose: () => console.log("File dismissed"),
  },
  argTypes: {
    revealAnimation: {
      control: { type: 'inline-radio' },
      options: ['width', 'fade'],
      description: 'Animation type for revealing the flyout',
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileUpload` component nested within a `Flyout`",
      },
    },
  },
};

type SimulatedUploadProps = FileUploadProps & {
  simulateProgressRateMs: number;
  simulateFailure: boolean;
}

export const SimulatedUpload: StoryObj<SimulatedUploadProps> = {
  render: (args) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const onFileSelect = () => {
      setShowProgress(true);
      setShowSuccess(false);
      setUploadProgress(0);

      let countProgress = 0;
      const interval = setInterval(() => {
        countProgress += 10;
        setUploadProgress(countProgress);

        if (args.simulateFailure && countProgress >= 60) {
          clearInterval(interval);
          setShowProgress(false);
          setShowSuccess(false);

          if (typeof args.onFileFailure === 'function') {
            args.onFileFailure();
          }

          return;
        }

        if (countProgress >= 100) {
          clearInterval(interval);
          setShowProgress(false);
          setShowSuccess(true);
        }
      }, args.simulateProgressRateMs);
    };

    const { simulateProgressRateMs, simulateFailure, ...fileUploadProps } = args;

    return (
      <FileUpload
        {...fileUploadProps}
        progress={uploadProgress}
        showProgress={showProgress}
        showSuccess={showSuccess}
        onFileSelect={onFileSelect}
      />
    );
  },
  args: {
    title: "Upload file",
    supportedFileTypes: [".txt", ".csv"],
    size: "sm",
    simulateProgressRateMs: 400,
    simulateFailure: false,
    onRetry: () => console.log("File retried"),
    onFileFailure: () => console.log("File failed"),
    onFileClose: () => console.log("File dismissed"),
  },
  argTypes: {
    simulateFailure: {
      control: 'boolean',
      description: 'Simulates upload failure',
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the `FileUpload` component upload progress in action",
      },
    },
  },
};
