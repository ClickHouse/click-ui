import { renderCUI } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { FileUploadArea } from './FileUploadArea';

const defaultProps = {
  title: 'Upload a file',
  supportedFileTypes: ['.txt', '.sql'],
  isDragging: false,
  isNotSupported: false,
  onDragEnter: () => undefined,
  onDragLeave: () => undefined,
  onDragOver: () => undefined,
  onDrop: () => undefined,
};

describe('FileUploadArea', () => {
  it('is a keyboard-operable button that opens the file picker', async () => {
    const onClick = vi.fn();
    const { getByRole } = renderCUI(
      <FileUploadArea
        {...defaultProps}
        onClick={onClick}
      />
    );

    const dropzone = getByRole('button', { name: 'Upload a file' });
    dropzone.focus();
    await userEvent.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates the dropzone with Space', async () => {
    const onClick = vi.fn();
    const { getByRole } = renderCUI(
      <FileUploadArea
        {...defaultProps}
        onClick={onClick}
      />
    );

    getByRole('button', { name: 'Upload a file' }).focus();
    await userEvent.keyboard(' ');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not a control after a file is selected', () => {
    const { queryByRole } = renderCUI(
      <FileUploadArea
        {...defaultProps}
        hasFile
        onClick={vi.fn()}
      >
        <div>selected file</div>
      </FileUploadArea>
    );

    expect(queryByRole('button', { name: 'Upload a file' })).toBeNull();
  });
});
