import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useState, useRef, useCallback } from "react";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";
import { Button, Icon, IconButton, ProgressBar } from "@/components";

interface FileInfo {
  name: string;
  size: number;
}

interface FileUploadProps {
  title: string;
  supportedFileTypes?: string[];
  size?: "sm" | "md";
  progress?: number;
  showSuccess?: boolean;
  showProgress?: boolean;
  failureMessage?: string;
  onRetry?: () => void;
  onFileSelect?: (file: File) => void;
  onFileSelectFailure?: () => void;
}

const UploadArea = styled.div<{
  $isDragging: boolean;
  $size: "sm" | "md";
  $hasFile: boolean;
  $isError?: boolean;
}>`
  background-color: ${({ theme }) => theme.click.fileUpload.color.background.default};
  border: ${({ theme }) => `1px solid ${theme.click.fileUpload.color.stroke.default}`};
  border-radius: ${({ theme, $hasFile }) =>
    $hasFile
      ? `${theme.click.fileUpload.sm.radii.all}`
      : `${theme.click.fileUpload.md.radii.all}`};
  padding: ${({ theme, $hasFile, $size }) =>
    $hasFile || $size === "sm"
      ? `${theme.click.fileUpload.sm.space.y} ${theme.click.fileUpload.sm.space.x}`
      : `${theme.click.fileUpload.md.space.y} ${theme.click.fileUpload.md.space.x}`};
  display: flex;
  flex-direction: ${props =>
    props.$hasFile ? "row" : props.$size === "sm" ? "row" : "column"};
  align-items: center;
  justify-content: ${props =>
    props.$hasFile ? "space-between" : props.$size === "sm" ? "space-between" : "center"};
  gap: ${({ theme, $size }) =>
    $size === "sm"
      ? theme.click.fileUpload.sm.space.gap
      : theme.click.fileUpload.md.space.gap};
  cursor: ${props => (props.$hasFile ? "default" : "pointer")};
  transition: ${({ theme }) => theme.click.fileUpload.transitions.all};

  ${props =>
    !props.$hasFile &&
    css`
      border-style: dashed;
      border-color: ${({ theme }) => theme.click.fileUpload.color.stroke.default};

      ${props.$isDragging &&
      css`
        background-color: ${({ theme }) =>
          theme.click.fileUpload.color.background.active};
        border-color: ${({ theme }) => theme.click.fileUpload.color.stroke.active};
      `}
    `}

  ${props =>
    props.$isError &&
    css`
      background-color: ${({ theme }) => theme.click.fileUpload.color.background.error};
      border: none;
    `}
`;

const FileUploadTitle = styled(Title)<{ $isNotSupported: boolean }>`
  font: ${({ theme }) => theme.click.fileUpload.typography.title.default};
  color: ${({ theme, $isNotSupported }) =>
    $isNotSupported
      ? theme.click.fileUpload.color.title.error
      : theme.click.fileUpload.color.title.default};
`;

const FileUploadDescription = styled(Text)`
  font: ${({ theme }) => theme.click.fileUpload.typography.description.default};
  color: ${({ theme }) => theme.click.fileUpload.color.description.default};
`;

const DocumentIcon = styled(Icon)`
  svg {
    width: ${({ theme }) => theme.click.fileUpload.sm.icon.size.width};
    height: ${({ theme }) => theme.click.fileUpload.sm.icon.size.height};
    color: ${({ theme }) => theme.click.fileUpload.sm.color.icon.default};
  }
`;

const UploadIcon = styled(Icon)`
  svg {
    width: ${({ theme }) => theme.click.fileUpload.md.icon.size.width};
    height: ${({ theme }) => theme.click.fileUpload.md.icon.size.height};
    color: ${({ theme }) => theme.click.fileUpload.md.color.icon.default};
  }
`;

const UploadText = styled.div<{ $size: "sm" | "md"; $hasFile: boolean }>`
  text-align: ${props => (props.$hasFile || props.$size === "sm" ? "left" : "center")};
  ${props =>
    (props.$hasFile || props.$size === "sm") &&
    css`
      flex: 1;
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
  gap: ${({ theme }) => theme.click.fileUpload.sm.space.gap};
  width: 100%;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.click.fileUpload.hasFile.header.space.gap};
  flex: 1;
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

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const ProgressPercentage = styled(Text)`
  min-width: ${({ theme }) => theme.sizes[10]};
  text-align: right;
  padding-right: ${({ theme }) => theme.click.fileUpload.md.space.gap};
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
  showSuccess = false,
  onFileSelectFailure,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isNotSupported, setIsNotSupported] = useState(false);
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
        if (onFileSelectFailure) {
          onFileSelectFailure();
          console.log("File type not supported");
          setIsNotSupported(true);
        } else {
          console.warn(`File type not supported: ${file.name}`);
        }
        return;
      }

      const newFile: FileInfo = {
        name: file.name,
        size: file.size,
      };

      setFile(newFile);

      if (onFileSelect) {
        onFileSelect(file);
        setIsNotSupported(false);
      }
    },
    [onFileSelect, supportedFileTypes, onFileSelectFailure]
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
        $isError={!!file && !showSuccess && !showProgress}
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
              {isNotSupported ? (
                <FileUploadTitle
                  $isNotSupported
                  type="h1"
                >
                  Unsupported file type
                </FileUploadTitle>
              ) : (
                <FileUploadTitle
                  $isNotSupported={isNotSupported}
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
              Browse file
            </Button>
          </>
        ) : (
          <FileInfo>
            <FileInfoHeader>
              <DocumentIcon name={"document"} />
              <FileDetails>
                <Text size={"md"}>{truncateFilename(file.name)}</Text>
                {(showSuccess || showProgress) && (
                  <Text
                    size={"md"}
                    color={"muted"}
                  >
                    {formatFileSize(file.size)}
                  </Text>
                )}
                {!showProgress && !showSuccess && (
                  <Text
                    size={"md"}
                    color={"danger"}
                  >
                    {failureMessage}
                  </Text>
                )}
                {showSuccess && (
                  <Icon
                    size={"xs"}
                    state={"success"}
                    name={"check"}
                  />
                )}
              </FileDetails>

              <FileActions>
                {!showProgress && !showSuccess && (
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
                  <ProgressBar
                    progress={progress}
                    type={"small"}
                  />
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
