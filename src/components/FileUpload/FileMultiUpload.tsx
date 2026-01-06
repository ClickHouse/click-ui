import React, { useEffect } from "react";
import { useState, useRef, useCallback } from "react";
import clsx from "clsx";

import { truncateFilename } from "@/utils/truncate.ts";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";
import { Button, Icon, IconButton, ProgressBar } from "@/components";
import styles from "./FileMultiUpload.module.scss";
import commonStyles from "./FileUploadCommon.module.scss";

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
  if (!supportedTypes.length) {
    return true;
  }

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
      <div
        className={clsx(
          styles.cuiUploadArea,
          commonStyles.uploadAreaBase,
          commonStyles.uploadAreaMd,
          commonStyles.uploadAreaDraggable,
          {
            [commonStyles.uploadAreaDragging]: isDragging,
          }
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <Icon
          name="upload"
          className={commonStyles.iconSizeMd}
        />
        <div className={styles.cuiUploadText}>
          {!isSupported ? (
            <Title
              type="h1"
              className={clsx(
                commonStyles.fileUploadTitle,
                styles.cuiFileUploadTitle,
                styles.cuiNotSupported
              )}
            >
              Unsupported file type
            </Title>
          ) : (
            <Title
              type="h1"
              className={clsx(commonStyles.fileUploadTitle, styles.cuiFileUploadTitle, {
                [styles.cuiNotSupported]: !isSupported,
              })}
            >
              {title}
            </Title>
          )}
          <Text className={commonStyles.fileUploadDescription}>
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
          Browse files
        </Button>
      </div>

      {files.length > 0 && (
        <div className={styles.cuiFilesList}>
          {files.map(file => (
            <div
              key={file.id}
              className={clsx(
                styles.cuiFileItem,
                commonStyles.uploadAreaBase,
                commonStyles.uploadAreaSm,
                {
                  [commonStyles.uploadAreaError]: file.status === "error",
                }
              )}
            >
              <Icon
                name={"document"}
                className={commonStyles.iconSizeSm}
              />
              <div className={commonStyles.fileInfoContainer}>
                <div className={commonStyles.fileInfoHeader}>
                  <Text size={"md"}>{truncateFilename(file.name)}</Text>
                  {file.status === "uploading" && (
                    <Text
                      size={"md"}
                      color={"muted"}
                    >
                      {file.progress}%
                    </Text>
                  )}
                  {file.status === "error" && (
                    <Text
                      size={"md"}
                      color={"danger"}
                    >
                      {file.errorMessage || "Upload failed"}
                    </Text>
                  )}
                  {file.status === "success" && (
                    <Icon
                      size={"xs"}
                      state={"success"}
                      name={"check"}
                    />
                  )}
                </div>

                {file.status === "uploading" && (
                  <div className={commonStyles.progressContainer}>
                    <ProgressBar
                      progress={file.progress}
                      type={"small"}
                    />
                  </div>
                )}
                {(file.status === "success" || file.status === "error") && (
                  <Text
                    size={"md"}
                    color={"muted"}
                  >
                    {formatFileSize(file.size)}
                  </Text>
                )}
              </div>

              <div className={commonStyles.fileActions}>
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
              </div>
            </div>
          ))}
        </div>
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
