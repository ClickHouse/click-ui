import { useCallback } from 'react';
import { styled } from 'styled-components';
import { FileUploadArea } from './FileUploadArea';
import { FileUploadItem } from './FileUploadItem';
import { useDragAndDrop } from './useDragAndDrop';

export interface FileUploadItem {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  errorMessage?: string;
}

export interface FileMultiUploadProps {
  title: string;
  supportedFileTypes?: string[];
  files: FileUploadItem[];
  onFileSelect?: (file: File) => void;
  onFileRetry?: (fileId: string) => void;
  onFileRemove?: (fileId: string) => void;
  onFileFailure?: () => void;
}

const FilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.click.fileUpload.sm.space.gap};
  width: 100%;
  margin-top: ${({ theme }) => theme.click.fileUpload.md.space.gap};
`;

export const FileMultiUpload = ({
  title,
  supportedFileTypes = ['.txt', '.sql'],
  files,
  onFileSelect,
  onFileRetry,
  onFileRemove,
  onFileFailure,
}: FileMultiUploadProps) => {
  const handleFilesProcessed = useCallback(
    (processedFiles: File[]) => {
      processedFiles.forEach(file => {
        if (onFileSelect) {
          onFileSelect(file);
        }
      });
    },
    [onFileSelect]
  );

  const {
    isDragging,
    isNotSupported,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    handleBrowseClick,
  } = useDragAndDrop({
    onFilesProcessed: handleFilesProcessed,
    supportedFileTypes,
    onFileFailure,
    multiple: true,
  });

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      if (onFileRemove) {
        onFileRemove(fileId);
      }
    },
    [onFileRemove]
  );

  const handleRetryUpload = useCallback(
    (fileId: string) => {
      if (onFileRetry) {
        onFileRetry(fileId);
      }
    },
    [onFileRetry]
  );

  const acceptedFileTypes = supportedFileTypes.join(',');

  return (
    <>
      <FileUploadArea
        title={title}
        supportedFileTypes={supportedFileTypes}
        size="md"
        isDragging={isDragging}
        isNotSupported={isNotSupported}
        hasFile={false}
        multiple={true}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      />

      {files.length > 0 && (
        <FilesList>
          {files.map(file => (
            <FileUploadItem
              key={file.id}
              fileName={file.name}
              fileSize={file.size}
              progress={file.progress}
              showSuccess={file.status === 'success'}
              showProgress={file.status === 'uploading'}
              failureMessage={file.errorMessage || 'Upload failed'}
              onRetry={() => handleRetryUpload(file.id)}
              onRemove={() => handleRemoveFile(file.id)}
              size="sm"
              inline={false}
            />
          ))}
        </FilesList>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedFileTypes}
        onChange={handleFileSelect}
        multiple
        style={{ display: 'none' }}
      />
    </>
  );
};
