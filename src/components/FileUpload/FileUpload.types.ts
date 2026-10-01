export interface FileUploadProps {
  /** Text shown in the upload area. */
  title: string;
  supportedFileTypes?: readonly string[];
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
