export { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);
