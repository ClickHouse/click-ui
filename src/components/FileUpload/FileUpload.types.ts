export interface FileUploadProps {
  title: string;
  supportedFileTypes?: Array<string>;
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
