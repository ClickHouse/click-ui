import { FileMultiUpload, FileUpload } from '@/components/FileUpload';
import { renderCUI } from '@/utils/test-utils';

describe('FileUpload', () => {
  it('accepts readonly supportedFileTypes', () => {
    const supportedFileTypes = ['.csv', '.json'] as const;
    const { getByText } = renderCUI(
      <FileUpload
        title="Upload a file"
        supportedFileTypes={supportedFileTypes}
      />
    );

    expect(getByText('Files supported: .csv, .json')).toBeInTheDocument();
  });
});

describe('FileMultiUpload', () => {
  it('accepts readonly supportedFileTypes and files', () => {
    const supportedFileTypes = ['.csv'] as const;
    const files = [
      { id: '1', name: 'data.csv', size: 1024, status: 'success', progress: 100 },
    ] as const;
    const { getByText } = renderCUI(
      <FileMultiUpload
        title="Upload files"
        supportedFileTypes={supportedFileTypes}
        files={files}
      />
    );

    expect(getByText('Files supported: .csv')).toBeInTheDocument();
    expect(getByText('data.csv')).toBeInTheDocument();
  });
});
