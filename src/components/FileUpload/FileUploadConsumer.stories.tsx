import { Meta, StoryObj } from '@storybook/react-vite';
import { FileUploadArea } from './FileUploadArea';
import { FileUploadItem } from './FileUploadItem';

/**
 * Stories exercising FileUpload's `styled(Title)` / `styled(Text)` /
 * `styled(Icon)` consumers, which override the base `color` / `font` (Title,
 * Text) and the descendant `svg { width; height; color }` (Icon). The base
 * rules of those components are scoped with `:where()` down to zero specificity,
 * so these consumer overrides win by specificity regardless of source/bundle
 * order. Without that scope the base rules tied the overrides at equal
 * specificity and could win by bundle order, silently dropping them
 * (title/description font, error color, icon sizing).
 */
const meta: Meta = {
  title: 'Forms/FileUploadConsumer',
  tags: ['fileUploadConsumer'],
  decorators: [
    Story => (
      <div
        data-testid="fileuploadconsumer-harness"
        style={{ width: 480, padding: 16 }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

const noop = () => undefined;

type AreaStory = StoryObj<typeof FileUploadArea>;
type ItemStory = StoryObj<typeof FileUploadItem>;

/** Default upload area: FileUploadTitle (font override) + UploadIcon (svg size override). */
export const AreaDefault: AreaStory = {
  render: () => (
    <FileUploadArea
      title="Upload your file"
      supportedFileTypes={['.txt', '.csv', '.sql']}
      size="md"
      isDragging={false}
      isNotSupported={false}
      hasFile={false}
      isError={false}
      onDragEnter={noop}
      onDragLeave={noop}
      onDragOver={noop}
      onDrop={noop}
    />
  ),
};

/** Unsupported file type: FileUploadTitle gets the error color override. */
export const AreaUnsupported: AreaStory = {
  render: () => (
    <FileUploadArea
      title="Upload your file"
      supportedFileTypes={['.txt', '.csv', '.sql']}
      size="md"
      isDragging={false}
      isNotSupported={true}
      hasFile={false}
      isError={false}
      onDragEnter={noop}
      onDragLeave={noop}
      onDragOver={noop}
      onDrop={noop}
    />
  ),
};

/** Success item: FileUploadDescription (font + color override) + DocumentIcon (svg size override). */
export const ItemSuccess: ItemStory = {
  render: () => (
    <FileUploadItem
      fileName="report.csv"
      fileSize={1048576}
      showSuccess={true}
      size="md"
      onRemove={noop}
    />
  ),
};

/** Error item: FileUploadDescription gets the error color override. */
export const ItemError: ItemStory = {
  render: () => (
    <FileUploadItem
      fileName="report.csv"
      fileSize={1048576}
      failureMessage="Upload failed"
      size="md"
      onRetry={noop}
      onRemove={noop}
    />
  ),
};
