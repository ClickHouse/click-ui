import { IconName } from './types';
import { resolveAssetName } from '@/components/Assets/config';

export const resolveIconName = (name: string): IconName => {
  return resolveAssetName(name) as IconName;
};
