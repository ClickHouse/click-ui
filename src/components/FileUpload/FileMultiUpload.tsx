import React, { useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { useState, useRef, useCallback } from "react";

import { truncateFilename } from "@/utils/truncate.ts";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";
import { Button, Icon, IconButton, ProgressBar } from "@/components";

export interface FileUploadItem {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "success" | "error";
  progress: number;
  errorMessage?: string;
}

interface FileMultiUploadProps {
  title: string;
  supportedFileTypes?: string[];
  files: FileUploadItem[];
  onFileSelect?: (file: File) => void;
  onFileRetry?: (fileId: string) => void;
  onFileRemove?: (fileId: string) => void;
  onFileFailure?: () => void;
}

const UploadArea = styled.div<{
  $isDragging: boolean;
}>`
  background-color: ${({ theme }) => theme.click.fileUpload.color.background.default};
  border: ${({ theme }) => `1px solid ${theme.click.fileUpload.color.stroke.default}`};
  border-radius: ${({ theme }) => theme.click.fileUpload.md.radii.all};
  padding: ${({ theme }) =>
    `${theme.click.fileUpload.md.space.y} ${theme.click.fileUpload.md.space.x}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.click.fileUpload.md.space.gap};
  cursor: pointer;
  transition: ${({ theme }) => theme.click.fileUpload.transitions.all};
  border-style: dashed;
  border-color: ${({ theme }) => theme.click.fileUpload.color.stroke.default};

  ${props =>
    props.$isDragging &&
    css`
      background-color: ${({ theme }) => theme.click.fileUpload.color.background.active};
      border-color: ${({ theme }) => theme.click.fileUpload.color.stroke.active};
    `}
`;

const FileUploadTitle = styled(Title)<{ $isNotSupported: boolean }>`
  font: ${({ theme }) => theme.click.fileUpload.typography.title.default};
  color: ${({ theme, $isNotSupported }) =>
    $isNotSupported
      ? theme.click.fileUpload.color.title.error
      : theme.click.fileUpload.color.title.default};
`;

const FileName = styled(Text)`
  font: ${({ theme }) => theme.click.fileUpload.typography.description.default};
  color: ${({ theme }) => theme.click.fileUpload.color.title.default};
`;

const FileUploadDescription = styled(Text)<{ $isError?: boolean }>`
  font: ${({ theme }) => theme.click.fileUpload.typography.description.default};
  color: ${({ theme, $isError }) =>
    $isError
      ? theme.click.fileUpload.color.title.error
      : theme.click.fileUpload.color.description.default};
`;

const UploadIcon = styled(Icon)`
  svg {
    width: ${({ theme }) => theme.click.fileUpload.md.icon.size.width};
    height: ${({ theme }) => theme.click.fileUpload.md.icon.size.height};
    color: ${({ theme }) => theme.click.fileUpload.md.color.icon.default};
  }
`;

const UploadText = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.click.fileUpload.sm.space.gap};
  width: 100%;
  margin-top: ${({ theme }) => theme.click.fileUpload.md.space.gap};
`;

const FileItem = styled.div<{ $isError?: boolean }>`
  background-color: ${({ theme }) => theme.click.fileUpload.color.background.default};
  border: ${({ theme }) => `1px solid ${theme.click.fileUpload.color.stroke.default}`};
  border-radius: ${({ theme }) => theme.click.fileUpload.sm.radii.all};
  padding: ${({ theme }) =>
    `${theme.click.fileUpload.sm.space.y} ${theme.click.fileUpload.sm.space.x}`};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.click.fileUpload.sm.space.gap};

  ${props =>
    props.$isError &&
    css`
      background-color: ${({ theme }) => theme.click.fileUpload.color.background.error};
      border-color: transparent;
    `}
`;

const DocumentIcon = styled(Icon)`
  svg {
    width: ${({ theme }) => theme.click.fileUpload.sm.icon.size.width};
    height: ${({ theme }) => theme.click.fileUpload.sm.icon.size.height};
    color: ${({ theme }) => theme.click.fileUpload.sm.color.icon.default};
  }
`;

const FileDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.click.fileUpload.md.space.gap};
  border: none;
`;

const FileActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 0;
`;

const FileContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 24px;
`;

const ProgressBarWrapper = styled.div`
  margin-top: ${({ theme }) => theme.click.fileUpload.md.space.gap};
  margin-bottom: 9px;
`;

const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes.toFixed(1)} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
};

const isFiletypeSupported = (filename: string, supportedTypes: string[]): boolean => {
  if (!supportedTypes.length) return true;

  const extension = filename.toLowerCase().slice(filename.lastIndexOf("."));
  return supportedTypes.some(type => type.toLowerCase() === extension.toLowerCase());
};

export const FileMultiUpload = ({
  title,
  supportedFileTypes = [".txt", ".sql"],
  files,
  onFileSelect,
  onFileRetry,
  onFileRemove,
  onFileFailure,
}: FileMultiUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!isSupported) {
      timeoutId = setTimeout(() => {
        setIsSupported(true);
      }, 2000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSupported]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounterRef.current -= 1;

    // Only set to false when left the container
    if (dragCounterRef.current <= 0) {
      setIsDragging(false);
      dragCounterRef.current = 0;
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Reset state when drag ends anywhere in the document
  useEffect(() => {
    const handleDragEnd = () => {
      setIsDragging(false);
      dragCounterRef.current = 0;
    };

    window.addEventListener("dragend", handleDragEnd);
    document.addEventListener("drop", handleDragEnd);
    document.addEventListener("mouseleave", handleDragEnd);

    return () => {
      window.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("drop", handleDragEnd);
      document.removeEventListener("mouseleave", handleDragEnd);
    };
  }, []);

  const processFile = useCallback(
    (file: File) => {
      if (!isFiletypeSupported(file.name, supportedFileTypes)) {
        setIsSupported(false);

        if (onFileFailure) {
          onFileFailure();
        }
        return;
      }

      setIsSupported(true);

      if (onFileSelect) {
        onFileSelect(file);
      }
    },
    [onFileSelect, supportedFileTypes, onFileFailure]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        Array.from(e.dataTransfer.files).forEach(file => {
          processFile(file);
        });
      }
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        Array.from(e.target.files).forEach(file => {
          processFile(file);
        });
      }
    },
    [processFile]
  );

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

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

  const acceptedFileTypes = supportedFileTypes.join(",");

  return (
    <>
      <UploadArea
        $isDragging={isDragging}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <UploadIcon name="upload" />
        <UploadText>
          {!isSupported ? (
            <FileUploadTitle
              $isNotSupported
              type="h1"
            >
              Unsupported file type
            </FileUploadTitle>
          ) : (
            <FileUploadTitle
              $isNotSupported={!isSupported}
              type="h1"
            >
              {title}
            </FileUploadTitle>
          )}
          <FileUploadDescription>
            Files supported: {supportedFileTypes.join(", ")}
          </FileUploadDescription>
        </UploadText>
        <Button
          type={"secondary"}
          onClick={e => {
            e.stopPropagation();
            handleBrowseClick();
          }}
        >
          Browse files
        </Button>
      </UploadArea>

      {files.length > 0 && (
        <FilesList>
          {files.map(file => (
            <FileItem
              key={file.id}
              $isError={file.status === "error"}
            >
              <DocumentIcon name={"document"} />
              <FileContentContainer>
                <FileDetails>
                  <FileName>{truncateFilename(file.name)}</FileName>
                  {file.status === "uploading" && (
                    <FileUploadDescription>{file.progress}%</FileUploadDescription>
                  )}
                  {file.status === "error" && (
                    <FileUploadDescription $isError>
                      {file.errorMessage || "Upload failed"}
                    </FileUploadDescription>
                  )}
                  {file.status === "success" && (
                    <Icon
                      size={"xs"}
                      state={"success"}
                      name={"check"}
                    />
                  )}
                </FileDetails>
                {file.status === "uploading" && (
                  <ProgressBarWrapper>
                    <ProgressBar
                      progress={file.progress}
                      type={"small"}
                    />
                  </ProgressBarWrapper>
                )}
                {(file.status === "success" || file.status === "error") && (
                  <FileUploadDescription>
                    {formatFileSize(file.size)}
                  </FileUploadDescription>
                )}
              </FileContentContainer>
              <FileActions>
                {file.status === "error" && (
                  <IconButton
                    size={"sm"}
                    icon={"refresh"}
                    type={"ghost"}
                    onClick={() => handleRetryUpload(file.id)}
                  />
                )}
                <IconButton
                  size={"sm"}
                  icon={"cross"}
                  type={"ghost"}
                  onClick={() => handleRemoveFile(file.id)}
                />
              </FileActions>
            </FileItem>
          ))}
        </FilesList>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedFileTypes}
        onChange={handleFileSelect}
        multiple
        style={{ display: "none" }}
      />
    </>
  );
};

export type { FileMultiUploadProps };
