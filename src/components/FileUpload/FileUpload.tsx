import React, { useEffect } from "react";
import { useState, useRef, useCallback } from "react";
import clsx from "clsx";

import { truncateFilename } from "@/utils/truncate.ts";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";
import { Button, Icon, IconButton, ProgressBar } from "@/components";
import styles from "./FileUpload.module.scss";

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
  onFileFailure?: () => void;
  onFileClose?: () => void;
}

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
  onFileFailure,
  onFileClose,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isNotSupported, setIsNotSupported] = useState(false);
  const [file, setFile] = useState<FileInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isNotSupported) {
      timeoutId = setTimeout(() => {
        setIsNotSupported(false);
      }, 2000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isNotSupported]);

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
        setIsNotSupported(true);

        if (onFileFailure) {
          onFileFailure();
        }
        return;
      }

      const newFile: FileInfo = {
        name: file.name,
        size: file.size,
      };

      setFile(newFile);
      setIsNotSupported(false);

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

    if (onFileClose) {
      onFileClose();
    }
  }, [onFileClose]);

  const handleRetryUpload = useCallback(() => {
    if (onRetry) {
      onRetry();
    }
  }, [onRetry]);

  const acceptedFileTypes = supportedFileTypes.join(",");

  return (
    <>
      <div
        className={clsx(styles.cuiUploadArea, {
          [styles.cuiHasFile]: !!file,
          [styles.cuiSmall]: size === "sm",
          [styles.cuiDraggable]: !file,
          [styles.cuiDragging]: isDragging && !file,
          [styles.cuiError]: !!file && !showSuccess && !showProgress,
        })}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!file ? handleBrowseClick : undefined}
      >
        {!file ? (
          <>
            <Icon
              name="upload"
              className={styles.cuiUploadIcon}
            />
            <div
              className={clsx(styles.cuiUploadText, {
                [styles.cuiSmall]: size === "sm",
                [styles.cuiCentered]: size === "md",
              })}
            >
              {isNotSupported ? (
                <Title
                  type="h1"
                  className={clsx(styles.cuiFileUploadTitle, styles.cuiNotSupported)}
                >
                  Unsupported file type
                </Title>
              ) : (
                <Title
                  type="h1"
                  className={clsx(styles.cuiFileUploadTitle, {
                    [styles.cuiNotSupported]: isNotSupported,
                  })}
                >
                  {title}
                </Title>
              )}
              <Text className={styles.cuiFileUploadDescription}>
                Files supported: {supportedFileTypes.join(", ")}
              </Text>
            </div>
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
          <div className={styles.cuiFileInfo}>
            <div className={styles.cuiFileInfoHeader}>
              <Icon
                name={"document"}
                className={styles.cuiDocumentIcon}
              />
              <div className={styles.cuiFileDetails}>
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
              </div>

              <div className={styles.cuiFileActions}>
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
              </div>
            </div>

            {showProgress && (
              <div className={styles.cuiProgressContainer}>
                <div className={styles.cuiProgressBarContainer}>
                  <ProgressBar
                    progress={progress}
                    type={"small"}
                  />
                </div>
                <Text
                  size={"sm"}
                  color={"muted"}
                  className={styles.cuiProgressPercentage}
                >
                  {progress}%
                </Text>
              </div>
            )}
          </div>
        )}
      </div>

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
