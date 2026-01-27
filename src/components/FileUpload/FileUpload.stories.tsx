import { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoint.sizes.md}) {
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
