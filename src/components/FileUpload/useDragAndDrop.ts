import { useState, useRef, useCallback, useEffect, type DragEvent, type RefObject, type ChangeEvent } from 'react';

export interface UseDragAndDropOptions {
  onFilesProcessed: (files: File[]) => void;
  supportedFileTypes: string[];
  onFileFailure?: () => void;
  multiple?: boolean;
}

export interface UseDragAndDropReturn {
  isDragging: boolean;
  isNotSupported: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBrowseClick: () => void;
}

const isFiletypeSupported = (filename: string, supportedTypes: string[]): boolean => {
  if (!supportedTypes.length) {
    return true;
  }

  const extension = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return supportedTypes.some(type => type.toLowerCase() === extension.toLowerCase());
};

export const useDragAndDrop = ({
  onFilesProcessed,
  supportedFileTypes,
  onFileFailure,
  multiple = false,
}: UseDragAndDropOptions): UseDragAndDropReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [isNotSupported, setIsNotSupported] = useState(false);
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

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounterRef.current -= 1;

    // Only set to false when left the container
    if (dragCounterRef.current <= 0) {
      setIsDragging(false);
      dragCounterRef.current = 0;
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Reset state when drag ends anywhere in the document
  useEffect(() => {
    const handleDragEnd = () => {
      setIsDragging(false);
      dragCounterRef.current = 0;
    };

    window.addEventListener('dragend', handleDragEnd);
    document.addEventListener('drop', handleDragEnd);
    document.addEventListener('mouseleave', handleDragEnd);

    return () => {
      window.removeEventListener('dragend', handleDragEnd);
      document.removeEventListener('drop', handleDragEnd);
      document.removeEventListener('mousele', handleDragEnd);
    };
  }, []);

  const processFiles = useCallback(
    (files: File[]) => {
      const validFiles: File[] = [];
      let hasInvalidFile = false;

      files.forEach(file => {
        if (isFiletypeSupported(file.name, supportedFileTypes)) {
          validFiles.push(file);
        } else {
          hasInvalidFile = true;
        }
      });

      if (hasInvalidFile) {
        setIsNotSupported(true);
        if (onFileFailure) {
          onFileFailure();
        }
      }

      if (validFiles.length > 0) {
        setIsNotSupported(false);
        onFilesProcessed(validFiles);
      }
    },
    [onFilesProcessed, supportedFileTypes, onFileFailure]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        processFiles(multiple ? files : [files[0]]);
      }
    },
    [processFiles, multiple]
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        processFiles(files);
      }
    },
    [processFiles]
  );

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return {
    isDragging,
    isNotSupported,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    handleBrowseClick,
  };
};
