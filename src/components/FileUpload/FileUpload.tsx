import { useState, useCallback } from 'react';

import { FileUploadArea } from './FileUploadArea';
import { FileUploadItem } from './FileUploadItem';
import { useDragAndDrop } from './useDragAndDrop';

interface FileInfo {
  name: string;
  size: number;
}

export interface FileUploadProps {
  title: string;
  supportedFileTypes?: string[];
  size?: 'sm' | 'md';
  progress?: number;
  showSuccess?: boolean;
  showProgress?: boolean;
  failureMessage?: string;
  onRetry?: () => void;
  onFileSelect?: (file: File) => void;
  onFileFailure?: () => void;
  onFileClose?: () => void;
}

export const FileUpload = ({
  title,
  supportedFileTypes = ['.txt', '.sql'],
  size = 'sm',
  onFileSelect,
  onRetry,
  progress = 0,
  failureMessage = 'Upload failed',
  showProgress = false,
  showSuccess = false,
  onFileFailure,
  onFileClose,
}: FileUploadProps) => {
  const [file, setFile] = useState<FileInfo | null>(null);

  const handleFilesProcessed = useCallback(
    (files: File[]) => {
      const selectedFile = files[0];
      const newFile: FileInfo = {
        name: selectedFile.name,
        size: selectedFile.size,
      };

      setFile(newFile);

      if (onFileSelect) {
        onFileSelect(selectedFile);
      }
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
    multiple: false,
  });

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (onFileClose) {
      onFileClose();
    }
  }, [onFileClose, fileInputRef]);

  const handleRetryUpload = useCallback(() => {
    if (onRetry) {
      onRetry();
    }
  }, [onRetry]);

  const acceptedFileTypes = supportedFileTypes.join(',');

  return (
    <>
      <FileUploadArea
        title={title}
        supportedFileTypes={supportedFileTypes}
        size={size}
        isDragging={isDragging}
        isNotSupported={isNotSupported}
        hasFile={!!file}
        isError={!!file && !showSuccess && !showProgress}
        multiple={false}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        {file && (
          <FileUploadItem
            fileName={file.name}
            fileSize={file.size}
            progress={progress}
            showSuccess={showSuccess}
            showProgress={showProgress}
            failureMessage={failureMessage}
            onRetry={handleRetryUpload}
            onRemove={handleRemoveFile}
            size={size}
            inline={true}
          />
        )}
      </FileUploadArea>

      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedFileTypes}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </>
  );
};
