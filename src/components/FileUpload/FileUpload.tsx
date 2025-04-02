import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useState, useRef, useCallback } from "react";
import { Text } from "@/components/Typography/Text/Text";
import { Button, Icon, IconButton, Title } from "@/components";

interface FileInfo {
  name: string;
  size: number;
}

interface FileUploadProps {
  title: string;
  supportedFileTypes?: string[];
  size?: "sm" | "md";
  onFileSelect?: (file: File) => void;
  onRetry?: () => void;
  progress?: number;
  showProgress?: boolean;
  failureMessage?: string;
  isSuccess?: boolean;
}

const UploadArea = styled.div<{
  $isDragging: boolean;
  $size: "sm" | "md";
  $hasFile: boolean;
  $isError?: boolean;
}>`
  background-color: ${({ theme }) => theme.click.card.secondary.color.background.default};
  border: ${({ theme }) => `1px solid ${theme.click.card.primary.color.stroke.default}`};
  border-radius: 8px;
  padding: ${props => (!props.$hasFile ? "16px" : "8px")};
  display: flex;
  flex-direction: ${props =>
    props.$hasFile ? "row" : props.$size === "sm" ? "row" : "column"};
  align-items: center;
  justify-content: ${props =>
    props.$hasFile ? "space-between" : props.$size === "sm" ? "space-between" : "center"};
  gap: 12px;
  cursor: ${props => (props.$hasFile ? "default" : "pointer")};
  transition: all 0.2s ease;

  ${props =>
    !props.$hasFile &&
    css`
      border-style: dashed;
      border-color: ${({ theme }) => theme.click.card.primary.color.stroke.default};

      &:focus {
        background-color: ${({ theme }) =>
          theme.click.card.secondary.color.background.hover};

        button {
          background-color: ${({ theme }) =>
            theme.click.card.secondary.color.background.hover};
        }
      }

      ${props.$isDragging &&
      css`
        background-color: ${({ theme }) =>
          theme.click.card.secondary.color.background.hover};
        border-color: #9ca3af;
      `}
    `}

  ${props =>
    props.$isError &&
    css`
      background-color: ${({ theme }) => theme.click.alert.color.background.danger};
      border: none;
    `}
`;

const DocumentIcon = styled(Icon)`
  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.global.color.text.muted};
  }
`;

const UploadIcon = styled(Icon)`
  svg {
    width: 32px;
    height: 32px;
    ${({ theme }) =>
      theme.name === "dark"
        ? `
    color: ${theme.global.color.text.default};
  `
        : `
    color: ${theme.global.color.text.default};
  `}
  }
`;

const UploadText = styled.div<{ $size: "sm" | "md"; $hasFile: boolean }>`
  text-align: ${props => (props.$hasFile || props.$size === "sm" ? "left" : "center")};
  ${props =>
    (props.$hasFile || props.$size === "sm") &&
    css`
      flex: 1;
      margin-left: 12px;
    `}

  ${props =>
    !props.$hasFile &&
    props.$size === "md" &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    `}
`;

const FileInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const FileDetails = styled.div`
  display: flex;
  gap: 8px;
  border: none;
`;

const FileActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 0;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  width: 100%;
  padding-left: 4px;
  padding-right: 8px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  flex: 1;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;

  ${({ theme }) =>
    theme.name === "dark"
      ? `
    background-color: ${theme.global.color.accent.default};
  `
      : `
    background-color: ${theme.global.color.text.default};
  `}
`;

const ProgressPercentage = styled(Text)`
  min-width: 36px;
  text-align: right;
  padding-right: 8px;
`;

const SuccessIcon = styled(Icon)`
  color: ${({ theme }) => theme.click.alert.color.text.success};
  background-color: ${({ theme }) => theme.click.alert.color.background.success};
  padding: 2px;
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

const truncateFilename = (filename: string, maxLength: number = 40): string => {
  if (filename.length <= maxLength) {
    return filename;
  }

  const extension =
    filename.lastIndexOf(".") !== -1 ? filename.slice(filename.lastIndexOf(".")) : "";

  const nameWithoutExtension = extension
    ? filename.slice(0, filename.lastIndexOf("."))
    : filename;

  const truncatedName =
    nameWithoutExtension.slice(0, maxLength - extension.length - 3) + "...";
  return truncatedName + extension;
};

const isFiletypeSupported = (filename: string, supportedTypes: string[]): boolean => {
  if (!supportedTypes.length) return true;

  const extension = filename.toLowerCase().slice(filename.lastIndexOf("."));
  return supportedTypes.some(type => type.toLowerCase() === extension.toLowerCase());
};

export const FileUpload = ({
  title,
  supportedFileTypes = [".txt", ".sql"],
  size = "sm",
  onFileSelect,
  onRetry,
  progress = 0,
  failureMessage = "Upload failed",
  showProgress = false,
  isSuccess = false,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<FileInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

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

    // Only set isDragging to false when we've left the container
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
        console.warn(`File type not supported: ${file.name}`);
        return;
      }

      const newFile: FileInfo = {
        name: file.name,
        size: file.size,
      };

      setFile(newFile);

      if (onFileSelect) {
        onFileSelect(file);
      }
    },
    [onFileSelect, supportedFileTypes]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        processFile(file);
      }
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        processFile(file);
      }
    },
    [processFile]
  );

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleRetryUpload = useCallback(() => {
    if (onRetry) {
      onRetry();
    }
  }, [onRetry]);

  const acceptedFileTypes = supportedFileTypes.join(",");

  return (
    <>
      <UploadArea
        $isDragging={isDragging}
        $size={size}
        $hasFile={!!file}
        $isError={!!file && !isSuccess && !showProgress}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!file ? handleBrowseClick : undefined}
      >
        {!file ? (
          <>
            <UploadIcon name="upload" />
            <UploadText
              $size={size}
              $hasFile={false}
            >
              <Title type="h1">{title}</Title>
              <Text
                size={"lg"}
                color={"muted"}
              >
                Files supported: {supportedFileTypes.join(", ")}
              </Text>
            </UploadText>
            <Button
              type={"secondary"}
              onClick={e => {
                e.stopPropagation();
                handleBrowseClick();
              }}
            >
              Browse file
            </Button>
          </>
        ) : (
          <FileInfo>
            <FileInfoHeader>
              <DocumentIcon name={"document"} />
              <FileDetails>
                <Text size={"md"}>{truncateFilename(file.name)}</Text>
                {isSuccess && (
                  <Text
                    size={"md"}
                    color={"muted"}
                  >
                    {formatFileSize(file.size)}
                  </Text>
                )}
                {!showProgress && !isSuccess && (
                  <Text
                    size={"md"}
                    color={"danger"}
                  >
                    {failureMessage}
                  </Text>
                )}
                {isSuccess && (
                  <SuccessIcon
                    size={"sm"}
                    name={"check"}
                  />
                )}
              </FileDetails>

              <FileActions>
                {!showProgress && !isSuccess && (
                  <IconButton
                    size={"sm"}
                    icon={"refresh"}
                    type={"ghost"}
                    onClick={handleRetryUpload}
                  />
                )}
                <IconButton
                  size={"sm"}
                  icon={"cross"}
                  type={"ghost"}
                  onClick={handleRemoveFile}
                />
              </FileActions>
            </FileInfoHeader>

            {showProgress && (
              <ProgressContainer>
                <ProgressBarContainer>
                  <ProgressBar $progress={progress} />
                </ProgressBarContainer>
                <ProgressPercentage
                  size={"sm"}
                  color={"muted"}
                >
                  {progress}%
                </ProgressPercentage>
              </ProgressContainer>
            )}
          </FileInfo>
        )}
      </UploadArea>

      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedFileTypes}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </>
  );
};

export type { FileUploadProps };
